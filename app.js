

var app = new Vue({
    el: '#app',
    data: {
          token: 'bMqlUL9q3wND8iJdcNSnb2s6jHcQfxhe'
        , endpoint : 'https://192.168.44.2'
        , nodes : []
        , output : ""
        }
    , methods : { 
        getNodes() {axios.defaults.headers.common['X-Api-Token'] = this.token 
          axios.get(this.endpoint+'/rudder/api/latest/nodes',{ 
            headers: { "X-Api-Token" : this.token }
          })
            .then(function (response) {
                  console.log(response.data.data);
                  app.output= response.data
                  app.nodes = response.data.data.nodes
                })
            .catch(function (error) {
                  console.log(error);
                });
        }
      , runNode(node) {
        console.log(node)
        axios.post(this.endpoint+'/rudder/api/latest/nodes/'+node.id+"/applyPolicy",{ 
            headers: { "X-Api-Token" : this.token }
          })
            .then(function (response) {
              console.log(response)
              app.output=response.data
            });
             }
      , runAll() {
        axios.post(this.endpoint+'/rudder/api/latest/nodes/applyPolicy',{ 
            headers: { "X-Api-Token" : this.token }
          })
            .then(function (response) {
              console.log(response)
              app.output=response.data
            });
             }

    }
})
