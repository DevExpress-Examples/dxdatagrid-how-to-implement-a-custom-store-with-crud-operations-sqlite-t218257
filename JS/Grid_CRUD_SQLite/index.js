window.Grid_CRUD_SQLite = window.Grid_CRUD_SQLite || {};

$(function () {
    
    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });
    // To customize the Generic theme, use the DevExtreme Theme Builder (http://js.devexpress.com/ThemeBuilder)
    // For details on how to use themes and the Theme Builder, refer to the http://js.devexpress.com/Documentation/Howto/Themes article
    
    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if(window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });

        try {
            window.db = window.sqlitePlugin.openDatabase({ name: "DB" });
        } catch (e) {
            DevExpress.ui.notify({
                message: e
            });
        }
    });

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !Grid_CRUD_SQLite.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "tizen":
                tizen.application.getCurrentApplication().exit();
                break;
            case "android":
                navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }


    Grid_CRUD_SQLite.app = new DevExpress.framework.html.HtmlApplication({
        namespace: Grid_CRUD_SQLite,
        layoutSet: DevExpress.framework.html.layoutSets[Grid_CRUD_SQLite.config.layoutSet],
        navigation: Grid_CRUD_SQLite.config.navigation,
        commandMapping: Grid_CRUD_SQLite.config.commandMapping
    });
    Grid_CRUD_SQLite.app.router.register(":view/:id", { view: "home", id: undefined });
    Grid_CRUD_SQLite.app.on("navigatingBack", onNavigatingBack);
    Grid_CRUD_SQLite.app.navigate();
});
