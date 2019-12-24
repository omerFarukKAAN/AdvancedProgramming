const CACHE ='advancedProgramming'
const FILES = ['/advancedProgramming/Classworks/CW1/PieChart.png','/advancedProgramming/Classworks/CW2/Counting.html', '/advancedProgramming/Classworks/CW2/TemperatureConvertor.html', 
'/advancedProgramming/Classworks/CW3/c4_data.html', '/advancedProgramming/Classworks/CW4/Courses.html', '/advancedProgramming/Classworks/CW5/Eloquent_JS.html'
,'/advancedProgramming/Classworks/CW6/File_Operations.html', '/advancedProgramming/Classworks/CW7/Array_vs_Map.html', '/advancedProgramming/Classworks/CW8/Document_Object_Model.html', 
'/advancedProgramming/Classworks/CW9/GitHub_Users.html',
'/advancedProgramming/Homeworks/HW1/Poisson_Table.html',
'/advancedProgramming/Homeworks/HW2/Database.html','/advancedProgramming/Homeworks/HW3/JS_Animations.html','/advancedProgramming/Project/index.html']

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('advancedProgramming', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
