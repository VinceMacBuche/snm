

var app = new Vue({
    el: '#app',
    data: {
          token: 'bMqlUL9q3wND8iJdcNSnb2s6jHcQfxhe'
        , endpoint : 'https://192.168.44.2'
        , nodes : []
        , output : ""
        }
    , methods : { 
        getNodes() {
          axios.get(this.endpoint+'/rudder/api/latest/nodes',{ 
            headers: { "X-Api-Token" : this.token }
          })
            .then(function (response) {
              app.output= response.data
              app.nodes = response.data.data.nodes
            })
        }
      , runNode(node) {
          // Use the browser Fetch API to stream data
          var request = new Request(this.endpoint+'/rudder/api/latest/nodes/'+node.id+"/applyPolicy",{ 
            headers: { "X-Api-Token" : this.token },
            method: "POST"
          })
          fetch(request)
            .then(function (response) {
              app.output=""
              var reader = response.body.getReader()
              var decoder = new TextDecoder();
              reader.read().then(function processResult(result) {
                if (result.done) return;
                var data= decoder.decode(result.value, {stream: true})
                app.output += data
                return reader.read().then(processResult);
              });
            })
        }
      , runAll() {
          axios.post(this.endpoint+'/rudder/api/latest/nodes/applyPolicy',undefined, { 
            headers: { "X-Api-Token" : this.token }
          })
            .then(function (response) {
              app.output=response.data
            });
        }

    }
})
