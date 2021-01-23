<template>
    <div class="row">
          <!-- left column -->
          <div class="col-md-10 offset-1 mt-2">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Update Post</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" enctype="multipart/form-data" @submit.prevent="updatePost()">
                <div class="card-body">
                  <div class="form-group">
                    <label for="catName">Add new title</label>
                    <input type="text" v-model="form.title" name="title" class="form-control" placeholder="Enter new post">
                  </div>
                  <div class="form-group">
                    <label for="catName">Add new description</label>
                    <textarea class="form-control" v-model="form.description" id="catName" name="description" rows="3" placeholder="Enter new description"></textarea>
                    </div>
                   <div class="form-group">
                    <label for="catName">Add new category</label>
                    <select class="form-control" name="cat_id" v-model="form.cat_id">
                      <option disabled value="">Select category</option>
                      <option :value="category.id" v-for="category in getAllCategory" :key="category.id">{{category.cat_name}}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="catName">Add new photo</label>
                    <input @change="changePhoto($event)" type="file" name="photo" class="form-control">
                  </div>
                  <!-- <span v-if="form.photo"><img :src="`uploadimage/${form.photo}`" alt="" width="70px" height="80px"></span> -->
                  <span v-if="form.photo"><img :src="uploadImage()" alt="" width="70px" height="80px"></span>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
        </div>
    </div>
           
</template>

<script>
    export default {
        name: "Edit",
        data(){
            return{
                form: new Form({
                    title: '',
                    description: '',
                    cat_id: '',
                    photo: ''
                })
            }
        },
        mounted(){
           this.$store.dispatch("allCategory")
        },
        created(){
            axios.get(`post/${this.$route.params.id}`)
                .then((response) => {
                    this.form.fill(response.data.post)
                })
                .catch((error) => {console.log(error);})
        },
        computed:{
             getAllCategory(){
              return this.$store.getters.getCategory
            }
        },
        methods: {
            changePhoto(event){
                let file = event.target.files[0];
                // console.log(file);
                if(file.size>1048576){
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                      })
                }else {
                  let reader = new FileReader();
                reader.onload = (event) => {
                  this.form.photo = event.target.result
                };
                reader.readAsDataURL(file);
                }
            },
            updatePost(){
              this.form.post(`update/${this.$route.params.id}`)
              .then(() => {
                     this.$router.push('/post-list')
                       Toast.fire({
                        icon: 'success',
                        title: 'Post updated successfully'
                      })
                  })
              .catch((error) => {console.log(error);})
            },
            uploadImage(){
                let img = this.form.photo;
                if(img.length>100){
                    return this.form.photo
                }else{
                    return `uploadimage/${this.form.photo}`
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>