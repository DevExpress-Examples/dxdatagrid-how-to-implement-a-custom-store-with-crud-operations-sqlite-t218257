Grid_CRUD_SQLite.home = function (params) {

    var store = new DevExpress.data.CustomStore({
        load: function (loadOptions) {
            var d = $.Deferred();
            DbHelper.select("*",d);
            return d.promise();
        },
        update: function (key, values) {
            var d = $.Deferred()
            DbHelper.update(key, values, d);
            return d;
        },
        remove: function (key) {
            var d = $.Deferred();
            DbHelper.remove(key,d);
            return d;
        },
        insert: function (values) {
            var d = $.Deferred();
            DbHelper.insert(values,d);
            return d;
        }

    });

    var viewModel = {
        tableExists: ko.observable(false),

        gridSettings: {
            dataSource: store,
            columns: [
                    { dataField: "ID", visible: false },
                    { dataField: "Name" },
                    { dataField: "Age" }
            ],
            editing: {
                editEnabled: true,
                insertEnabled: true,
                removeEnabled: true
            }
        },

        onCreate: function (e) {
            DbHelper.createBase();
        }
    };

    DbHelper.count(viewModel);


    return viewModel;
};