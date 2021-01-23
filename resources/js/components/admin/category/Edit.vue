<template>
  <div class="row">
          <!-- left column -->
          <div class="col-md-8 offset-2 mt-2">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Edit Category</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" @submit.prevent="updateCategory()">
                <div class="card-body">
                  <div class="form-group">
                    <label for="catName">Edit category</label>
                    <input type="text" v-model="form.cat_name" name="cat_name" class="form-control" id="catName" placeholder="Enter Category">
                    
                  </div>
                 
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
        name: "Edit",
        mounted(){
            axios.get(`/editcategory/${this.$route.params.id}`)
            .then((res) => {
                this.form.fill(res.data.category)
            })
            .catch((error) => {
                console.log(error);
            })
        },
        data() {
             return{
               // Create a new form instance
            form: new Form({
              cat_name: ''
            })
           }
        },
        methods: {
            updateCategory(){
              this.form.post(`/updatecategory/${this.$route.params.id}`)
                  .then((response) => {
                     this.$router.push('/category-list')
                       Toast.fire({
                        icon: 'success',
                        title: 'Category updated successfully'
                      })
                      console.log(response.data.id);
                  })
                  .catch((error) => {
                       
                  })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>