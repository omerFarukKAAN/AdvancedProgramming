class ReadJSON {
    constructor (filePath) {
        this.filePath = filePath
        this.data = null
        this.readData()
    }
    
    toString () {
        return this.filePath + ''
    }

    readData () {
        document.getElementById('subTitle').innerText = this.filePath
        fetch(this.filePath)
        .then(res => res.json()) 
        .then(res => {
            this.data = res
            document.getElementById('info').innerHTML = 'manifest.json is read'
            this.fillTable()
        })
        
    }

    fillTable () {

        //Table
        var table = document.getElementById('datas')

        //Heads
        table.innerHTML = '<tr><th>Keys</th><th>Values</th></tr>'

        //Object Keys
        var tableKeys = Object.keys(this.data)

        //Fill Table
        tableKeys.forEach( item => {
            table.innerHTML += '<tr><th>' + item + '</th><td>'+ ((typeof(this.data[item]) != "object") ? this.data[item] : '<font style="color:red">This is an Object or Array</font>') +'</td></tr>'
        })
    }
}