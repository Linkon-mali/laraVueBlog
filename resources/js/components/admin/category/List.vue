<template>
    <section class="content mt-2">
      <div class="row">
        <div class="col-8 offset-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Category List</h3>
              <div class="card-tools">
                <button class="btn btn-primary">
                    <router-link to="/add-category" style="color: #fff; text-decoration: none;">Add Category</router-link>
                </button>
              </div> 
            </div>

            <!-- /.card-header -->
            <div class="card-body">
              <div id="example2_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4"><div class="row"><div class="col-sm-12 col-md-6"></div><div class="col-sm-12 col-md-6"></div></div><div class="row"><div class="col-sm-12"><table id="example2" class="table table-bordered table-hover dataTable" role="grid" aria-describedby="example2_info">
                <thead>
                <tr role="row">
                  <th class="sorting_asc" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">
                    <select name="" id="" v-model="select" @change="deleteSelected">
                      <option value="">Select</option>
                      <option value="">Delete</option>
                    </select>
                          <br>
                    <input type="checkbox" v-model="allSelect" @click="selectAll">
                        <span v-if="allSelect==false">Check all</span>
                        <span v-else>Uncheck all</span>
                    </th>
                  <th class="sorting_asc" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">SL</th>
                  <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Category Name</th>
                  <th class="sorting_asc" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">Date</th>
                  <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Actions</th>
                  </tr>
                </thead>
                <tbody>
                <tr role="row" class="odd" v-for="(category, index) in getAllCategory" :key="category.id">
                  <td class="sorting_1">
                    <input type="checkbox" v-model="categoryItem" :value="category.id">
                  </td>
                  <td class="sorting_1">{{ index + 1 }}</td>
                  <td>{{ category.cat_name }}</td>
                  <td>{{ category.created_at | timeformat }}</td>
                  <td>
                      <router-link :to="`/edit-category/${category.id}`">Edit</router-link>
                      <a href="" @click.prevent="deleteCategory(category.id)">Delete</a>
                   </td>
                </tr></tbody>
              </table></div></div><div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="example2_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="example2_previous"><a href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->

        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
</template>

<script>
    export default {
        name: "List",
        data(){
            return{
              categoryItem: [],
              select: '',
              allSelect: false
            }
        },
        mounted(){
            this.$store.dispatch("allCategory")
        },
        computed: {
            getAllCategory(){
              return this.$store.getters.getCategory
            }
        },
        methods: {
           deleteCategory(id){
             axios.get('/category/'+id)
              .then(() => {
                this.$store.dispatch("allCategory")
                    Toast.fire({
                        icon: 'success',
                        title: 'Category deleted successfully'
                      })
              })
              .catch((error) => {
                   console.log(error);
              })
           },

           deleteSelected(){
            axios.get('/deletecategory/'+this.categoryItem)
              .then(() => {
                this.categoryItem = []
                this.$store.dispatch("allCategory")
                    Toast.fire({
                        icon: 'success',
                        title: 'Category deleted successfully'
                      })
              })
              .catch((error) => {
                   console.log(error);
              })
           },

           selectAll(){
             if(this.allSelect==false){
                this.allSelect = true
             for(var category in this.getAllCategory){
               this.categoryItem.push(this.getAllCategory[category].id)
             }
             }else{
                this.allSelect = false
                this.categoryItem = []
             }
           }
        }
    }
</script>

<style lang="stylus" scoped>

</style>