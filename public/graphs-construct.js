var firebaseConfig = {
    apiKey: "AIzaSyDlELr4sUiin44q4C2nOk2FoCjhU97wpb4",
    authDomain: "jalbat-fae7c.firebaseapp.com",
    databaseURL: "https://jalbat-fae7c.firebaseio.com",
    projectId: "jalbat-fae7c",
    storageBucket: "jalbat-fae7c.appspot.com",
    messagingSenderId: "430029289123",
    appId: "1:430029289123:web:de9f5c04b92eef956b7116",
    measurementId: "G-HEYVS35KH8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const speed_vol = {
    speed: 0,
    vol: 0
  }
  var database = firebase.database();

  var speedRef = database.ref('/vol_dependencies/ls');
  var volRef = database.ref('/vol_dependencies/total');
  var pHRef = database.ref('/health_dependencies/pH');
  var turRef = database.ref('/health_dependencies/turbidity');
  var tempRef = database.ref('/health_dependencies/temp');
  
  speedRef.on('value', (snap) => {
      document.getElementById('speed-display').innerHTML = snap.val();
      speed_vol.speed = parseFloat(snap.val());
  });
  volRef.on('value', (snap) => {
    document.getElementById('vol-display').innerHTML = snap.val();
    speed_vol.vol = parseFloat(snap.val());
  });
  pHRef.on('value', (snap) => {
    document.getElementById('ph-display').innerHTML = snap.val();
    dataPH[0].value = parseInt(snap.val());
  Plotly.newPlot('ph-gauge', dataPH , layout);
  });
  turRef.on('value', (snap) => {
    document.getElementById('tur-display').innerHTML = snap.val();
    dataTur[0].value = parseInt(snap.val());
  Plotly.newPlot('tur-gauge', dataTur, layout);
  });
  tempRef.on('value', (snap) => {
    document.getElementById('temp-display').innerHTML = snap.val();
    dataTemp[0].value = parseInt(snap.val());
  Plotly.newPlot('temp-gauge', dataTemp, layout);
  });
  
  
  var dataPH = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 7,
      title: { text: "PH" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  

  var dataTemp = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 35,
      title: { text: "Temperature" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  

  var dataTur = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 3,
      title: { text: "Turbidity" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { width: 300, height: 200, margin: { t: 0, b: 0 } };
  Plotly.newPlot('temp-gauge', dataTemp, layout);
  Plotly.newPlot('tur-gauge', dataTur, layout);
  Plotly.newPlot('ph-gauge', dataPH, layout);

  // -----------------------------------------------------------------------------------------------------------------

  var time = new Date();

var data = [{
  x: [time],
  y: [speed_vol.speed],
  name: "Speed",
  mode: 'area',
  fill: 'tonexty',
  fillcolor: '#800020',
  line: {color: '#800020'}
},
{
  x: [time],
  y: [speed_vol.vol],
  name: "Volume",
  mode: 'area',
  fill: 'tonexty',
  fillcolor: '#200080',
  line: {color: '#200080'}
}
]

Plotly.newPlot('speed-vol', data);

var cnt = 0;

var interval = setInterval(function() {

  var time = new Date();

  var update1 = {
  x:  [[time]],
  y: [[speed_vol.speed]]
  }
  var update2 = {
    x:  [[time]],
    y: [[speed_vol.vol]]
    }
    

  var olderTime = time.setMinutes(time.getMinutes() - 1);
  var futureTime = time.setMinutes(time.getMinutes() + 1);

  var minuteView = {
        xaxis: {
          type: 'date',
          range: [olderTime,futureTime]
        }
      };

  Plotly.relayout('speed-vol', minuteView);
  Plotly.extendTraces('speed-vol', update1, [0])
  Plotly.extendTraces('speed-vol', update2, [1])
  if(++cnt === 100) clearInterval(interval);
}, 1000);
