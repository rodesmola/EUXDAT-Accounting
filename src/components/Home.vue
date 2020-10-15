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
                    label="Search by"
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

                 <v-flex xs3 class="pl-3 pr-3">
                  <v-btn small round color="#27304c"  dark @click="getInfo()" title="Run service" >
                    Filter
                  </v-btn>
                </v-flex>

              </v-layout>
            </v-flex>

         

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer app class="footer pa-3">
      For missing features, contact us:
      <v-icon class="ml-1" color="white">email</v-icon>
        <a href="mailto:euxdat@euxdat.eu" style="color: white"> euxdat@euxdat.eu</a>
        <v-spacer></v-spacer>
        <img class="mr-1" src="http://www.euxdat.eu/wp-content/uploads/2018/01/eu.png" alt="EU" style="height:20px">
        <span>This project has received funding from the European Union’s Horizon 2020 research and innovation programme under the grant agreement No. 777549 </span>
    </v-footer>
  </v-app>

</template>

<script>

export default {
  data: () => ({
    user: {},
    filterArr:[
      {
        id: "infra",
        name: "By infrastruture",
      },
      {
        id: "prov",
        name: "By provider",
      },
      {
        id: "res",
        name: "By resource",
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
    selectedInfrastructure: "",
    providersArr: [
      {
        id: 1,
        name: "HRLS",
      }
    ],
    selectedProvider: "",
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
    selectedResource: "",
    timeframeArr: [
      {
        id: 1,
        name: "All records",        
      },
      {
        id: 2,
        name: "Today",
        start: '2020-10-14 00:00:00.000000',
        end: '2020-10-15 00:00:00.000000',
      },
      {
        id: 3,
        name: "Last week",
        start: '2020-10-05 00:00:00.000000',
        end: '2020-10-10 00:00:00.000000',
      },
      {
        id: 4,
        name: "Last month",
        start: '2020-09-14 00:00:00.000000',
        end: '2020-10-15 00:00:00.000000',
      },
      {
        id: 5,
        name: "Last 6 months",
        start: '2020-04-14%2000%3A00%3A00.000000',
        end: '2020-10-15%2000%3A00%3A00.000000',
      }
      
    ],
    selectedTimeframe: {
        id: 1,
        name: "All records",        
      },

  }),
  methods: {
    getInfo(){
           
      var url = 'https://accounting.test.euxdat.eu/api/consumption';

      if(this.selectedFilter.id === 'infra'){
        url = url.concat('/infrastructure/', this.selectedInfrastructure.id , '/user/1');
      }else if (this.selectedFilter.id === 'prov'){
        url = url.concat('/provider/', this.selectedProvider.id , '/user/1');
      }else if (this.selectedFilter.id === 'res'){
        url = url.concat('/resource_type/', this.selectedResource.id , '/user/1');
      }
      
      if(this.selectedTimeframe.id != 1){
        url = url.concat('/transaction/', this.selectedTimeframe.start, '/', this.selectedTimeframe.end)        
      }

console.log(url)

      // this.$http.get('https://accounting.test.euxdat.eu/api/consumption/infrastructure/1/user/3').then(response => {                            
                          
      // }, response => {        
      //   this.$eventBus.$emit('show-alert', "error", response.statusText); 
      // });
    },
    logout: function(){
      this.$keycloak.logoutFn();
    },//logout
  },
  created(){
    var user = JSON.parse(window.atob(this.$keycloak.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    this.user = user;
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
