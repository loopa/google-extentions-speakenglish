/// <reference path="chrome.d.ts" />
/// <reference path="d.ts/DefinitelyTyped/jquery/jquery.d.ts" />
/// <reference path="d.ts/DefinitelyTyped/knockout/knockout.d.ts" />

class ViewModel{
    data:any;
    popup_enable:boolean;
    auto_close_enable:boolean;
    select_lag_key:string;
    select_lag_value:string;
    items = ko.observableArray([]);

    constructor(private namespace:string) {

    }

    getConfig(callback:(data:any) => any){
        this.data = JSON.parse(localStorage.getItem(this.namespace));
        var temp:any;
        if(this.data == null){
            $.ajax({
                type: "GET",
                url: chrome.extension.getURL('../../data/default_config.json'),
                async: false,
                success: function(json:any){
                        temp = JSON.parse(json);
                }
            });
            this.data = temp;
            localStorage.setItem(this.namespace,JSON.stringify(this.data));
        }
        callback(this.data);
    }

    load(){
        this.getConfig((data:any) => {
            console.log(data);
            for(var i in data.select_lag){
                this.items.push(data.select_lag[i]);
            }
            // this.items = ko.mapping.fromJSON(data.select_lag);
            this.popup_enable = data.popup_enable;
            this.auto_close_enable = data.auto_close_enable;
            this.select_lag_key = data.select_lag_key;
            this.select_lag_value = data.select_lag_value;
        });
    }

    save () {
        this.data.popup_enable = this.popup_enable;
        this.data.auto_close_enable = this.auto_close_enable;
        this.data.select_lag_key = this.select_lag_key;
        this.data.select_lag_value = this.select_lag_value;
        localStorage.setItem(this.namespace,JSON.stringify(this.data));
    }

}

$(() => {
    var m = new ViewModel('speak-english');
    m.load();
    ko.applyBindings(m);
});


