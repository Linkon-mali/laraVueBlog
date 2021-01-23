<template>
    <section id="sidebar">
        
          <div class="span4">
            <aside class="right-sidebar">
              <div class="widget">
                <form class="form-search">
                  <input @keyup="realSearch" placeholder="Type something" type="text" v-model="keyword" class="input-medium search-query">
                  <button type="submit" @click.prevent="realSerch" class="btn btn-square btn-theme">Search</button>
                </form>
              </div>
              <div class="widget">
                <h5 class="widgetheading">Categories</h5>
                <ul class="cat">
                  <li v-for="category in allcategories" :key="category.id"><i class="icon-angle-right"></i><router-link :to="`/categories/${category.id}`">{{category.cat_name}}</router-link><span> (20)</span></li>
                </ul>
              </div>
              <div class="widget">
                <h5 class="widgetheading">Latest posts</h5>
                <ul class="recent">
                  <li v-for="(post, index) in blogpost" v-if="index < 5" :key="index">
                    <img :src="`uploadimage/${post.photo}`" class="pull-left" height="50px" width="50px" alt="" />
                    <h6><router-link :to="`/blog/${post.id}`">{{post.title}}</router-link></h6>
                    <p>
                      {{post.description | sortlength(100, '...')}}
                    </p>
                  </li> 
                </ul>
              </div>
              <div class="widget">
                <h5 class="widgetheading">Popular tags</h5>
                <ul class="tags">
                  <li><a href="#">Web design</a></li>
                  <li><a href="#">Trends</a></li>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Internet</a></li>
                  <li><a href="#">Tutorial</a></li>
                  <li><a href="#">Development</a></li>
                </ul>
              </div>
            </aside>
          </div>
    </section>
</template>

<script>
import __ from 'lodash'

export default {
    name: "BlogSidebar",
    data(){
      return {
        keyword: ''
      }
    },
    computed: {
        allcategories(){
          return this.$store.getters.allcategories
        },
        blogpost(){
          return this.$store.getters.latestpost
        }
    },
    mounted(){
      this.$store.dispatch('allcategories');
      this.$store.dispatch('latestPost');
    },
    methods: {
      realSearch:_.debounce(function() {
        this.$store.dispatch('SearchPost', this.keyword);
        }, 1000)
    }
}
</script>

<style>

</style>