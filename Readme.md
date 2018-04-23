# dxDataGrid - How to implement a custom store with CRUD operations (SQLite)


<p><strong>This example can be tested on a mobile device and it cannot be tested in the DevExtreme simulator.</strong><br><br>The <a href="http://js.devexpress.com/Documentation/Howto/UI_Widgets/Data_Grid/Data_Binding?version=14_1#UI_Widgets_Data_Grid_Data_Binding_Provide_Data_Using_the_Data_Library_Using_a_CustomStore">dxDataGrid binding using a CustomStore</a> help topic and the <a href="https://www.devexpress.com/Support/Center/p/KA18955">A custom data source does not apply paging, filtering, sorting and grouping</a> article describe how to implement a custom data source that loads data for a <a href="http://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid">dxDataGrid</a> . <br><br>This example demonstrates how to make a custom store that works with a SQLite data source. For this purpose, the <a href="https://build.phonegap.com/plugins/731">SQLite PhoneGap</a> plugin is used. Note how the custom store's <a href="http://js.devexpress.com/Documentation/ApiReference/Data_Library/CustomStore/Methods#insertvalues">insert</a>, <a href="http://js.devexpress.com/Documentation/ApiReference/Data_Library/CustomStore/Methods#updatekey_values">update</a> and <a href="http://js.devexpress.com/Documentation/ApiReference/Data_Library/CustomStore/Methods#removekey">remove</a> methods are implemented to use the <a href="https://github.com/millerjames01/Cordova-SQLitePlugin/blob/25ecd47f92d5b2bb7a673aec7cfc827f5fca9dd0/README.md">plugin's API</a>. Each of these methods will be called automatically by the widget.  When a method is called, we need to execute a corresponding SQL query and pass the required parameters. Note that in order to work with the database, it is necessary to initialize it in the "deviceready" event handler:</p>


```js
//index.js
    $(document).on("deviceready", function () {
        ...
        window.db = window.sqlitePlugin.openDatabase({ name: "DB" });
    });
```


<br>
<p>Note how the deferred object resolves the amount of affected rows in each method and the reject function receives the exception message. This allows displaying the query execution exception in the grid's error row.<br><br>The example contains a ready-to-use package file for Android, so you can install and test it right away. Any modification or building the package for iOS <strong>will require </strong>going through steps described in <a href="http://js.devexpress.com/Documentation/Howto/VS_Integration/Packaging/?version=14_2#Packaging">Packaging</a>.<br><br><strong>See also:<br></strong><a href="http://api.jquery.com/category/deferred-object/">Deferred Object</a> <br><a href="https://www.devexpress.com/Support/Center/p/E4816">How to implement CRUD operations with a DataSource</a> <br><a href="https://www.devexpress.com/Support/Center/p/T137724">dxDataGrid - How to implement a custom store with CRUD operations</a></p>

<br/>


