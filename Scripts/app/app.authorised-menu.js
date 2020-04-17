
$(document).ready(function () {
    var $container = $("#side-menu");
    $container.find(".custom-menu").remove();
    var getMenuTreeDom = function (r) {
        var getNode = function (node, isSocket) {
            if (!isSocket) {
                var url = node.Url || "javascript:void(0);";
                var menuName = node.MenuName;
                var str = "";
                str += '<li>';
                str += '<a href="' + url + '">';
                //str += '<i class="fa fa-sitemap"></i>';
                str += '<span class="nav-label">' + menuName + '</span>';
                str += '</a>';
                str += '</li>';
                return $(str);
            } else if(isSocket) {
                var socket = '<ul class="nav  collapse pd-l-10"></ul>';
                return $(socket);
            }
        };
        var getArrow = function () {
            return $('<span class="fa arrow"></span>');
        };
        var recursion = function (source, pId, $root) {
            if (!$root && !pId) {
                var parent = source.find(function (t) { return t.ParentID === null; });
                if (parent) {
                    $root = getNode(parent);
                    pId = parent.MenuID;
                }
            } else if (!$root) {
                var _parent = source.find(function (t) { return t.ParentID === pId; });
                $root = getNode(_parent);//pid as id
            }

            var childs = source.filter(function (t) { return t.ParentID === pId; });

            if (childs.length > 0) {
                var $socket = getNode(null, true);
                childs.forEach(function (v) {
                    var $childTobeAdded = getNode(v);
                    $socket.append($childTobeAdded);
                    var x = recursion(source, v.MenuID, $childTobeAdded);
                });
                $root.find('a').append(getArrow());
                //$('<i class="fa fa-magic"></i>').insertBefore($root.find('a').find('span.nav-label'));
                $root.addClass('active');
                $root.append($socket);
            }

            return $root;
        };
        //console.log(r)
        var $g = recursion(r);
        if ($g) {
            $g.addClass("custom-menu");
            $g = $('<div/>').append($g).html();
            return $g;
        }
        return;
    };
    $.getJson("/home/getmenu", function (r) {
        if (r.Status === 200) {
            var raw = r.Data;
            var strDom = getMenuTreeDom(raw);
            if (strDom) {
                $container.append(strDom);
            }
            // MetsiMenu
            $('#side-menu').metisMenu();
        }
    }, function (r) {
        alertify.error(r.Message);
    });
});