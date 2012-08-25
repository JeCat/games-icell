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
            if( typeof(building.upgraders[upgraderClass.className])=='undefined' )
            {
                building.upgraders[upgraderClass.className] = new upgraderClass ;
            }
            var upgrader = building.upgraders[upgraderClass.className] ;
            
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
                detailHtml+= '<div>' +property +':'+ building[property] + ' -> ' + (building[property]+detail[property]) + '</div>' ;
            }
            upgraderUi.find('.detail').html(detailHtml) ;
            
            // 升级费用
            var cost = upgrader.cost() ;
            var costHtml = '费用：' ;
            var idx = 0 ;
            for(var proteinName in cost)
            {
                var proteinFormula = ins(yc.inner.ProteinFormulas).mapFormulas[proteinName] ;
                if(idx++)
                {
                    costHtml+= ' + ' ;
                }
                costHtml+= '<span style="color:'+proteinFormula.colorHtml+'">♫ ' + cost[proteinName] + '</span> ' ;
            }
            upgraderUi.find('.cost').html(costHtml) ;
            
            // 升级按钮
            upgraderUi.find('.upgrade')
                .attr('disabled',!upgrader.isUnlock())  // 是否解锁
                .click(function(){
                    // 关闭菜单
                    menu.ui.hide() ;
                    
                    // 执行升级
                    upgrader.upgrade(building) ;
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
