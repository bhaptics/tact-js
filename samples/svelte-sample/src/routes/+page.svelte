<script>

  import tactJs from 'tact-js';

  tactJs.initialize("testApp", "testAppName")
  tactJs.turnOffAll();
  let prevState = undefined;
  tactJs.addListener(function(msg) {
    console.log('changed from player', msg);

    if (prevState !== msg.status && msg.status === 'Connected') {
      registerFile('Explosion')
      registerFile('PistolHit')
    }
    prevState = msg.status;
  })


  function onClickDotmode() {
    if (!tactJs) {
      return;
    }
    var points = [{
      Index : getIndex(),
      Intensity : getIntensity()
    }];
    tactJs.submitDot(getKey(), getPostion(), points, getDuration());
  }

  function onClickPathmode() {
    if (!tactJs) {
      return;
    }
    var points = [{
      Intensity : getIntensity(),
      X : getX(),
      Y : getY()
    }];
    tactJs.submitPath(getKey(), getPostion(), points, getDuration());

  }

  function onClickTactFile() {
    if (!tactJs) {
      return;
    }

    tactJs.submitRegistered(getTactFile());
  }

  function getKey() {
    return document.getElementById("key").value;
  }

  function getPostion() {
    return document.getElementById("position").value;
  }

  function getIndex() {
    return parseInt(document.getElementById("index").value);
  }

  function getIntensity() {
    return parseInt(document.getElementById("intensity").value);
  }

  function getDuration() {
    return parseInt(document.getElementById("duration").value);
  }

  function getX() {
    return parseFloat(document.getElementById("x").value);
  }

  function getY() {
    return parseFloat(document.getElementById("y").value);
  }
  function getTactFile() {
    return document.getElementById("tactFile").value;
  }

  function registerFile(feedbackFile) {
    fetch(feedbackFile + '.tact')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        tactJs.registerFile(feedbackFile, JSON.stringify(json));
      })
      .catch(function(e) {
        console.log('error', e)
      });
  }
</script>

<h1>Welcome to SvelteKit</h1>


<div class="text-xl font-bold">
  Dot/Path Mode Sample
</div>
<div class="flex mt-4">
  <div class="p-2">key</div>
  <input class="border p-2" type="text" value="keyValue" id="key">
</div>
<div class="flex my-2">
  <div class="p-2">position</div>
  <select id="position" class="p-2 border">
    <option>VestFront</option>
    <option>VestBack</option>
    <option>Head</option>
    <option>ForearmL</option>
    <option>ForearmR</option>
    <option>GloveL</option>
    <option>GloveR</option>
  </select>
</div>
<div  class="flex my-2">
  <div class="p-2">intensity</div>
  <select id="intensity" class="p-2">
    <option>0</option>
    <option>10</option>
    <option>20</option>
    <option>30</option>
    <option>40</option>
    <option>50</option>
    <option>60</option>
    <option>70</option>
    <option>80</option>
    <option>90</option>
    <option selected>100</option>
  </select>
</div>
<div class="flex my-2">
  <div class="p-2">duration (ms)</div>
  <select id="duration">
    <option>50</option>
    <option>100</option>
    <option>500</option>
    <option selected>1000</option>
    <option>3000</option>
    <option selected>100</option>
  </select>
</div>
<div class="flex my-2">
  <div class="p-2">Motor Index</div>
  <select id="index" class="p-2 border">
    <option>0</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
    <option>11</option>
    <option>12</option>
    <option>13</option>
    <option>14</option>
    <option>15</option>
    <option>16</option>
    <option>17</option>
    <option>18</option>
    <option>19</option>
  </select>
  <button
         class="p-2 rounded ml-2"
         on:click={onClickDotmode}>
    Dot Mode Test
  </button>
</div>

<div class="flex my-2">
  <span class="p-2">x</span>
  <input id="x" type="number" value="0.5" min="0" max="1" step="0.1" class="border p-2">
  <span class="p-2">y</span>
  <input id="y" type="number" value="0.5"  min="0" max="1" step="0.1" class="border p-2">
  <input type="button" value="Path Mode Test"
         class="p-2 rounded ml-2"
         on:click={onClickPathmode}>
</div>


<div class="text-xl font-bold mt-16">
  Tact File Sample
</div>

<div>
  <select id="tactFile" class="p-2">
    <option>Explosion</option>
    <option selected>PistolHit</option>
  </select>

  <input type="button" value="Play"
         class="p-2 rounded ml-2"
         on:click={onClickTactFile}>
</div>


