function prepareData(items, length) {
    var result = [];
    for (var i = 0; i < length; i++) {
        var item = {};
        for (var prop in items(i)) {
            item[prop] = items(i)[prop];
        }
        result.push(item);
    }
    return result;
}

window.DbHelper = {
    createBase: function () {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (ID integer primary key AUTOINCREMENT, Name text, Age integer)');
        });

        var d1 = new $.Deferred();
        var d2 = new $.Deferred();
        var d3 = new $.Deferred();

        $.when(d1, d2, d3).done(function (v1, v2, v3) {
            window.location.reload();
        });

        DbHelper.insert({ Name: 'John', Age: 20 }, d1);
        DbHelper.insert({ Name: 'Kate', Age: 18 }, d2);
        DbHelper.insert({ Name: 'Peter', Age: 32 }, d3);
    },
    insert: function (values, deferred) {
        var columns = [],
            vArray = [],
            v = []
        for (var prop in values) {
            columns.push(prop);
            vArray.push(values[prop]);
            v.push("?");
        }

        db.transaction(function (tx) {
            var query = "INSERT INTO test_table (" + columns.join(',') + ") VALUES (" + v.join(',') + ")";
            tx.executeSql(query, vArray, function (tx, res) {
                deferred.resolve(res.rowsAffected);
            });
        }, function (e) {
            deferred.reject(e.message);
        });
    },
    update: function (key, values, deferred) {
        var valuesString = [];
        for (var prop in values) {
            if (prop != "ID") valuesString.push(prop + " = " + (typeof values[prop] == 'string' ? "\"" + values[prop] + "\"" : values[prop]));
        }
        db.transaction(function (tx) {
            var query = "UPDATE test_table SET " + valuesString.join(',') + " WHERE ID = " + key.ID;
            tx.executeSql(query, [], function (tx, res) {
                deferred.resolve(res.rowsAffected);
            });
        }, function (e) {
            deferred.reject(e.message);
        });
    },
    select: function (name,deferred) {
        db.transaction(function (tx) {
            var q = "select " + name + " from test_table;";
            tx.executeSql(q, [], function (tx, res) {
                var l = res.rows.length;
                deferred.resolve(prepareData(res.rows.item, l), { totalCount: l });
            });
        }, function (e) {
            deferred.reject(e.message);
        });
    },
    remove: function (key, deferred) {
        var condition = "ID = " + key.ID;
        db.transaction(function (tx) {
            var q = "DELETE FROM test_table WHERE " + condition;
            tx.executeSql(q, [], function (tx, res) {
                deferred.resolve(res.rowsAffected);
            });
        }, function (e) {
            deferred.reject(e.message);
        });
    },
    count: function (vm) {
        db.transaction(function (tx) {
            tx.executeSql("select count(ID) as cnt from test_table;", [], function (tx, res) {
                vm.tableExists(res.rows.length != 0);
            });
        });
    }
};