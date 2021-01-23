<template>
    <div class="row">
          <!-- left column -->
          <div class="col-md-8 offset-2 mt-2">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Add New Category</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" @click.prevent="addCategory()">
                <div class="card-body">
                  <div class="form-group">
                    <label for="catName">Add category</label>
                    <input type="text" v-model="form.cat_name" name="cat_name" class="form-control" :class="{ 'is-invalid': form.errors.has('cat_name') }" id="catName" placeholder="Enter Category">
                    <has-error :form="form" field="cat_name"></has-error>
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
        name: "New",
        data() {
             return{
               // Create a new form instance
            form: new Form({
              cat_name: ''
            })
           }
        },
        methods: {
            addCategory(){
              this.form.post('/add-category')
                  .then((response) => {
                     this.$router.push('/category-list')
                       Toast.fire({
                        icon: 'success',
                        title: 'Category added successfully'
                      })
                  })
                  .catch((error) => {
                       
                  })
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>