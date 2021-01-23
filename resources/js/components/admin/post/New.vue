<template>
    <div class="row">
          <!-- left column -->
          <div class="col-md-10 offset-1 mt-2">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Add New Post</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" enctype="multipart/form-data" @submit.prevent="addnewPost()">
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
                  <span v-if="form.photo"><img :src="form.photo" alt="" width="70px" height="80px"></span>
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
        </div>
    </div>
           
</template>

<script>
    export default {
        name: "New",
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
            addnewPost(){
              this.form.post('/savepost')
              .then((response) => {
                     this.$router.push('/post-list')
                       Toast.fire({
                        icon: 'success',
                        title: 'Post added successfully'
                      })
                  })
              .catch((error) => {console.log(error);})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>