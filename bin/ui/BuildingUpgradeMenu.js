yc.ui.BuildingUpgradeMenu = function(){
    
    this.ui = $('#bulding-upgrade-menu') ;
    var menu = this ;
    
    this.show = function(building){
        
        var buildingClass = building.constructor ;
        
        // 没有可用的升级
        if(buildingClass.upgraders.length<1)
        {
            return ;
        }
        
        $('#bulding-upgraders-outer').html('') ;
        
        for(var u=0;u<buildingClass.upgraders.length;u++)
        {
            var upgraderClass = buildingClass.upgraders[u] ;
            var upgrader = building.upgrader(upgraderClass) ;
            
            var upgraderUi = $('#bulding-upgrader-template')
                    .clone()
                    .appendTo('#bulding-upgraders-outer')
                    .attr({id:''})
                    .show() ;
                    
            var v = upgraderUi.find('.title') ;
            
            upgraderUi.find('.newLv').html('Lv '+(upgrader.lv+1)) ;
            upgraderUi.find('.title').html(upgrader.title) ;
            upgraderUi.find('.description').html(upgrader.description) ;
            
            // 升级效果
            var detail = upgrader.upgradeDetail(building) ;
            var detailHtml = '效果' ;
            for(var property in detail)
            {
                detailHtml+= '<div>' +property +':'+ building[property].toFixed(1) + ' -> ' + (building[property]+detail[property]).toFixed(1) + '</div>' ;
            }
            upgraderUi.find('.detail').html(detailHtml) ;
            
            // 升级费用
            var cost = upgrader.cost() ;
            upgraderUi.find('.cost').html( '费用：'+yc.ui.costHtml(cost) ) ;
            
            // 升级按钮
            upgraderUi.find('.upgrade')
                .attr('disabled',!upgrader.isUnlock())  // 是否解锁
                .data('upgrader',upgrader)
                .click(function(){
                    // 关闭菜单
                    menu.ui.hide() ;
                    
                    // 执行升级
                    $(this).data('upgrader').upgrade(building) ;
                }) ;
        }
        
        
        this.ui.css({
            left: window.event.clientX-this.ui.width()-100
            , top: window.event.clientY-this.ui.height()/2
        })
        .show()
        [0].focus() ;
    }
}


yc.ui.BuildingUpgradeMenu.className = 'yc.ui.BuildingUpgradeMenu' ;
