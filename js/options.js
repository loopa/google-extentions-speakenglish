var ViewModel = (function () {
    function ViewModel(namespace) {
        this.namespace = namespace;
        this.items = ko.observableArray([]);
    }
    ViewModel.prototype.getConfig = function (callback) {
        this.data = JSON.parse(localStorage.getItem(this.namespace));
        var temp;
        if (this.data == null) {
            $.ajax({
                type: "GET",
                url: chrome.extension.getURL('../../data/default_config.json'),
                async: false,
                success: function (json) {
                    temp = JSON.parse(json);
                }
            });
            this.data = temp;
            localStorage.setItem(this.namespace, JSON.stringify(this.data));
        }
        callback(this.data);
    };

    ViewModel.prototype.load = function () {
        var _this = this;
        this.getConfig(function (data) {
            console.log(data);
            for (var i in data.select_lag) {
                _this.items.push(data.select_lag[i]);
            }

            _this.popup_enable = data.popup_enable;
            _this.auto_close_enable = data.auto_close_enable;
            _this.select_lag_key = data.select_lag_key;
            _this.select_lag_value = data.select_lag_value;
        });
    };

    ViewModel.prototype.save = function () {
        this.data.popup_enable = this.popup_enable;
        this.data.auto_close_enable = this.auto_close_enable;
        this.data.select_lag_key = this.select_lag_key;
        this.data.select_lag_value = this.select_lag_value;
        localStorage.setItem(this.namespace, JSON.stringify(this.data));
    };
    return ViewModel;
})();

$(function () {
    var m = new ViewModel('speak-english');
    m.load();
    ko.applyBindings(m);
});
