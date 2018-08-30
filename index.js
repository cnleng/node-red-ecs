module.exports = function(RED) {
    function NodeRedECS(config) {
        var http = require("http");
        RED.nodes.createNode(this,config);
        // Retrieve ECS config
        this.server = RED.nodes.getNode(config.server);
        var node = this;
        node.on('input', function(msg) {
            
            var options = {
    		host: this.server.host,
    		path: msg.payload,
    		method: "POST",
                port: this.server.port,
    		headers: {
        	"Content-Type": "application/json"
    		}
	    };

	    var req = http.request(options, function (res) {
            	var responseString = "";

    	    	res.on("data", function (data) {
                	responseString += data;
                	msg.payload = responseString;
            	});
            	res.on("end", function () {
                	console.log(responseString);
            	});
            });

            req.write("OK");
            req.end();
            node.send(msg);
        });
    }
    RED.nodes.registerType("node-red-ecs",NodeRedECS);
}
