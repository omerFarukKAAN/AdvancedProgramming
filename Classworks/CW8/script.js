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
        document.getElementById('url').innerText = this.filePath
        fetch(this.filePath)
        .then(res => res.json()) 
        .then(res => {
            this.data = res
            this.fillTable()
        })
        
    }

    fillTable () {

        //Table
        var table = document.getElementById('tbl')

        let tableValues = Object.values(this.data);
        
        table.innerHTML = '<tr><th>Name</th><th>Diam</th><th>Mass</th><th>Radius</th><th>Period</th></tr>'
        
        for (let item of tableValues) {
            table.innerHTML += '<tr><th>' + item.Name + '</th><th>'+ item.Diam +'</th><th>'+ item.Mass +'</th><th>'+ item.Radius +'</th><th>'+ item.Period +'</th></tr>'
        }
    }
}