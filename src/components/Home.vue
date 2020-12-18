<template>
  <v-app>

    <v-toolbar app color="white" xs12 tabs  height="58px" style="border-bottom: 4px solid #098837 !important;">
      <v-toolbar-title>
        <a href="https://test.euxdat.eu/">
          <img style="width: 140px;" src="../assets/euxdat_logo.png" alt="">
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="color:#27304c">
        <v-icon>person</v-icon> <span v-if="!$vuetify.breakpoint.smAndDown">{{user.name}}</span>
      </span>
      <v-btn icon title="Exit app" @click="logout()">
        <v-icon color="#27304c">exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <img src="../assets/background2.jpg" style="height:100%; width: 100vw; position:absolute; opacity: 0.3;" alt="">

    <v-container>

      <v-layout row wrap style="text-align: left; padding-top: 8px;">
        <v-flex xs12>
          <v-card >

            <v-toolbar class="green" tabs>
              <v-toolbar-title>
                <img style="width: 45px;" src="../assets/logo_1-1.png" alt="">
                <span style="font-size: 24px; margin-left: 5px;">Accounting</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>        
            </v-toolbar>

            <v-flex xs12 pl-2 row >
              <v-layout row wrap class="mt-3 pb-5">

                <v-flex sm3 class="pl-3 pr-3">
                  <v-combobox  hide-details hide-no-data hide-selected dense 
                    v-model="selectedFilter"
                    :items="filterArr"
                    item-text="name"
                    item-value="id"
                    label="Search by:"
                    color="green"
                  ></v-combobox>
                </v-flex>

                <v-flex sm3 class="pl-3 pr-3" v-if="selectedFilter.id == 'infra'">
                  <v-combobox  hide-details hide-no-data hide-selected dense 
                    v-model="selectedInfrastructure"
                    :items="infrastructuresArr"
                    item-text="name"
                    item-value="id"
                    label="Select infrastructure"
                    color="green"
                  ></v-combobox>
                </v-flex>

                <v-flex sm3 class="pl-3 pr-3" v-if="selectedFilter.id == 'prov'">
                  <v-combobox  hide-details hide-no-data hide-selected dense 
                    v-model="selectedProvider"
                    :items="providersArr"
                    item-text="name"
                    item-value="id"
                    label="Select provider"
                    color="green"
                  ></v-combobox>
                </v-flex>                

                <v-flex sm3 class="pl-3 pr-3" v-if="selectedFilter.id == 'res'">
                  <v-combobox  hide-details hide-no-data hide-selected dense 
                    v-model="selectedResource"
                    :items="resourcesArr"
                    item-text="name"
                    item-value="id"
                    label="Select resource"
                    color="green"
                  ></v-combobox>
                </v-flex>    

                <v-flex sm3 class="pl-3 pr-3" v-if="selectedFilter">
                  <v-combobox  hide-details hide-no-data hide-selected dense 
                    v-model="selectedTimeframe"
                    :items="timeframeArr"
                    item-text="name"
                    item-value="id"
                    label="Select timeframe"
                    color="green"
                  ></v-combobox>
                </v-flex>

                 <v-flex xs3 class="pl-3 pr-3 mt-3" v-if="selectedFilter">
                  <v-btn small round color="#27304c"  dark @click="getInfo()" title="Run service" >
                    Filter
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-flex>

            <!-- ############## -->

            <v-flex xs12 pl-2 pr-2 row v-if="isOutput">

              <v-toolbar class="mb-1" color="#27304c" dark flat height= "35">
                <v-toolbar-title>Accumulated consumption of a given {{title}}:</v-toolbar-title>
              </v-toolbar>

              <v-layout row wrap class="mt-3 pb-5">

                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.CPU != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" dark flat height= "35">
                      <v-toolbar-title>CPU</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.CPU.mean | truncate}} {{this.output.CPU.unit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.CPU.stdev | truncate}} {{this.output.CPU.unit}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>    
                  </v-card>
                </v-flex>       
                            
                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.Node != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" color="indigo darken-5" dark flat height= "35">
                      <v-toolbar-title>Node</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.CPU.mean | truncate}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Node.stdev | truncate}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>      
                  </v-card>
                </v-flex>

                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.GPU != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" color="indigo darken-5" dark flat height= "35">
                      <v-toolbar-title>GPU</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.GPU.mean | truncate}} {{this.output.GPU.unit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.GPU.stdev | truncate}} {{this.output.GPU.unit}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>                  
                  </v-card>
                </v-flex>

                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.Memory != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" color="indigo darken-5" dark flat height= "35">
                      <v-toolbar-title>Memory</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Memory.mean | truncate}} {{this.output.Memory.unit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Memory.stdev | truncate}} {{this.output.Memory.unit}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>                
                  </v-card>
                </v-flex>

                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.Network_Bandwidth != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" color="indigo darken-5" dark flat height= "35">
                      <v-toolbar-title>Network bandwidth</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Network_Bandwidth.mean | truncate}} {{this.output.Network_Bandwidth.unit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Network_Bandwidth.stdev | truncate}} {{this.output.Network_Bandwidth.unit}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>       
                  </v-card>
                </v-flex>

                <v-flex xs6 sm4 md3 lg2 xl2 class="pa-2" v-if="output.Storage != undefined">
                  <v-card >
                    <v-toolbar class="mb-1 green" color="indigo darken-5" dark flat height= "35">
                      <v-toolbar-title>Storage</v-toolbar-title>
                    </v-toolbar>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content><strong>Mean:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Storage.mean | truncate}} {{this.output.Storage.unit}}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-list-tile-content><strong>Stdev:</strong></v-list-tile-content>
                        <v-list-tile-content class="align-end">{{this.output.Storage.stdev | truncate}} {{this.output.Storage.unit}}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>                    
                  </v-card>
                </v-flex>

              </v-layout>
            </v-flex>        

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer app class="footer pa-3">
      <span v-if="!$vuetify.breakpoint.smAndDown"> For missing features, contact us: </span>
      <v-icon class="ml-1" style="margin-right: 5px;" color="white">email</v-icon>
        <a href="mailto:euxdat@euxdat.eu" style="color: white"> euxdat@euxdat.eu</a>
        <v-spacer></v-spacer>
        <img class="mr-1" src="http://www.euxdat.eu/wp-content/uploads/2018/01/eu.png" alt="EU" style="height:20px">
        <span v-if="!$vuetify.breakpoint.smAndDown"><span v-if="!$vuetify.breakpoint.lgAndDown"> This project has received funding from the </span> Union’s Horizon 2020 
          research and innovation programme under the grant agreement No. 777549 </span>
    </v-footer>
  </v-app>

</template>

<script>
// https://accounting.test.euxdat.eu/api/ui/ --> swagger doc
export default {
  data: () => ({
    user: {},
    filterArr:[
      {
        id: "infra",
        name: "Infrastruture",
      },
      {
        id: "prov",
        name: "Provider",
      },
      {
        id: "res",
        name: "Resource",
      }
    ],
    selectedFilter: "",
    infrastructuresArr: [
      {
        id: 1,
        name: "Sodalite HPC",
      },
      {
        id: 2,
        name: "Test HPC",
      },
      {
        id: 3,
        name: "Hawk HPC",
      }
    ],    
    selectedInfrastructure:  {
      id: 1,
      name: "Sodalite HPC",
    },
    providersArr: [
      {
        id: 1,
        name: "HRLS",
      }
    ],
    selectedProvider: {
      id: 1,
      name: "HRLS",
    },
    resourcesArr: [
      {
        id: "CPU",
        name: "CPU"
      },
      {
        id: "GPU",
        name: "GPU"
      },
      {
        id: "Memory",
        name: "Memory"
      },
      {
        id: "Network_Bandwidth",
        name: "Network bandwidth"
      },
      {
        id: "Node",
        name: "Node"
      },
      {
        id: "Storage",
        name: "Storage"
      }
    ],
    selectedResource: {
      id: "CPU",
      name: "CPU"
    },
    timeframeArr: [
      {
        id: 1,
        name: "All records",        
      },
      {
        id: 2,
        name: "Today",
        start: '2020-04-01 00:00:00.000000',
        end: '2020-04-02 00:00:00.000000',
      },
      {
        id: 3,
        name: "Last week",
        start: '2020-04-05 00:00:00.000000',
        end: '2020-04-10 00:00:00.000000',
      },
      {
        id: 4,
        name: "Last month",
        start: '2020-04-01 00:00:00.000000',
        end: '2020-04-30 00:00:00.000000',
      },
      {
        id: 5,
        name: "Last 6 months",
        start: '2020-04-01%2000%3A00%3A00.000000',
        end: '2020-05-30%2000%3A00%3A00.000000',
      }
      
    ],
    selectedTimeframe: {
      id: 1,
      name: "All records",        
    },
    output: {},
    isOutput: false,
    title: "",
    userAccId: ""
  }),
  methods: {
    getUserId(userName){
    
      // var today = new Date();

      // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // console.log(date)

      this.$http.get('https://accounting.test.euxdat.eu/api/'.concat('users/name/', userName.preferred_username)).then(response => {                            
        //console.log("CAMBIA EL USER ID")        
        this.userAccId = response.body.id;
        this.userAccId = 2 // <----- REMOVE
      }, response => {        
        //this.$eventBus.$emit('show-alert', "error", response.statusText); 
      });
    },  
    getInfo(){
      
      var url = 'https://accounting.test.euxdat.eu/api/consumption';

      if(this.selectedFilter.id === 'infra'){
        url = url.concat('/infrastructure/', this.selectedInfrastructure.id , '/user/', this.userAccId);
        this.title = "infrastructure"
      }else if (this.selectedFilter.id === 'prov'){
        url = url.concat('/provider/', this.selectedProvider.id , '/user/', this.userAccId);
        this.title = "provider"
      }else if (this.selectedFilter.id === 'res'){
        url = url.concat('/resource_type/', this.selectedResource.id , '/user/', this.userAccId);
        this.title = "resource type"
      }      
      if(this.selectedTimeframe.id != 1){
        url = url.concat('/transaction/', this.selectedTimeframe.start, '/', this.selectedTimeframe.end)        
      }

      console.log(url)

      this.$http.get(url).then(response => {                                    
        this.output = response.body;
        this.isOutput = true;    
      }, response => {        
        //this.$eventBus.$emit('show-alert', "error", response.statusText); 
      });
    },
    logout: function(){
      this.$keycloak.logoutFn();
    },//logout
  },
  created(){
    this.user = JSON.parse(window.atob(this.$keycloak.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    this.getUserId(this.user);
  },
  filters: {
    truncate: function(value) {
      if(value != undefined){
        value = value.toString().substring(0, 5);
      }
      return value
    },
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0px;
}

.footer{
  padding-left: 5px;
  padding-right: 5px;
  background-color: #28324f !important;
  color: white !important;
  font-size: 11px;
}
.green {
  background: linear-gradient(60deg,#66bb6a,#43a047) !important;
	-webkit-box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2) !important;
	box-shadow: 0 12px 20px -10px rgba(76,175,80,.28),0 4px 20px 0 rgba(0,0,0,.12),0 7px 8px -5px rgba(76,175,80,.2) !important;
}
</style>
