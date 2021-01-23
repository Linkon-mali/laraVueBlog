import axios from "axios"

export default {
    state: {
        category: [],
        post: [],
        blogpost: [],
        singlepost: [],
        allcategories: [],
        latestpost: []
    },
    getters: {
        getCategory(state){
           return state.category
        },
        getAllPost(state){
            return state.post
        },
        getblogPost(state){
            return state.blogpost
        },
        singlepost(state){
            return state.singlepost
        },
        allcategories(state){
            return state.allcategories
        },
        latestpost(state){
            return state.latestpost
        }
    },
    actions: {
        allCategory(context){
            axios.get('/category')
            .then((response) => {
                context.commit('categories', response.data.categories)
            })
            .catch((error) => {console.log(error)})
        },

        getAllPost(context){
            axios.get('/post')
            .then((res) => {
                context.commit('allpost', res.data.posts)
            })
            .catch((error) => {console.log(error)})
        },

        getblogPost(context){
            axios.get('/blogpost')
            .then((res) => {
                context.commit('getblogpost', res.data.posts)
            })
            .catch((error) => {console.log(error)})
        },

        getPostById(context,payload){
            axios.get('/singlepost/'+payload)
                .then((response)=>{
                    context.commit('siglePost',response.data.post)
                })
                .catch((error) => {console.log(error)})
        },

        allcategories(context){
            axios.get('/categories')
            .then((res) => {
                context.commit('allcategories', res.data.categories)
            })
            .catch((error) => {console.log(error)})
        },

        getPostByCatId(context,payload){
            axios.get('/categorypost/'+payload)
                .then((response)=>{
                    context.commit('getPostByCatId',response.data.posts)
                })
                .catch((error) => {console.log(error)})
        },

        SearchPost(context,payload){
                axios.get('/search?s='+payload)
                .then((response)=>{
                    context.commit('getSearchPost',response.data.posts)
                })
                .catch((error) => {console.log(error)})
        },

        latestPost(context){
            axios.get('/latestpost')
            .then((res) => {
                context.commit('latestpost', res.data.posts)
            })
            .catch((error) => {console.log(error)})
        }
    },
    mutations: {
        categories(state, data){
            return state.category = data
        },
        allpost(state, payload){
            return state.post = payload
        },
        getblogpost(state, payload){
            return state.blogpost = payload
        },
        siglePost(state,payload){
            return state.singlepost = payload
        },
        allcategories(state, payload){
            return state.allcategories = payload
        },
        getPostByCatId(state,payload){
            state.blogpost = payload
        },
        getSearchPost(state, payload){
            state.blogpost = payload
        },
        latestpost(state, payload){
            state.latestpost = payload
        }
    }
}