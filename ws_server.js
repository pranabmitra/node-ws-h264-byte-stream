const WebSocket = require('ws');
const fs = require('fs');
const wss = new WebSocket.Server({ port: 9001 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // received message
    });

    ws.send('Start Counting...');

    var counter = 1;
    var timer = setInterval(function onSetInterval() {
        sendByteStream();
    }, 1500);

    function sendByteStream() {
        var file = './sample_video/' + (counter++)  + '.h264';

        if (fs.existsSync(file)) {
            var stat = fs.statSync(file);

            // ws.send(fs.createReadStream(file, {start: 0, end: stat.size}));

            // var readStream = fs.createReadStream(file,
            // {
            // start: 0,
            // end: stat.size
            // });
            // readStream.on('data', function(data) {
            // console.log(counter);
            // ws.send(data);

            // });

            fs.readFile(file, function(err,data) {
                if(err){console.log(err)}
                // ws.send(data,{binary:true});
                console.log(counter, data.buffer);
                ws.send((data));

            });
        } else {
            ws.send('No more files!');
            clearInterval(timer);
        }

    }

});
