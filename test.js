(function () {
    var wrapper;
  
    wrapper = function ($) {
      return $(function () {
        var form_sel, sel, setup_configurator;
        sel = "frame-configuration";
        form_sel = "form.entityform";
  
        // Internet Explorer 6-11
        //var isIE = /*@cc_on!@*/false || !!document.documentMode;
  
        // Edge 20+
        //var isEdge = !isIE && !!window.StyleMedia;
  
        // term id
        $("[data-filter=.tid-446]").parent().remove();
        $("[data-filter=.tid-436]").parent().remove();
        $("[data-filter=.tid-422]").parent().remove();
        $("[data-filter=.tid-462]").parent().remove();
        $("[data-filter=.tid-421]").parent().remove();
        $("[data-filter=.tid-466]").parent().remove();
        $("[data-filter=.tid-448]").parent().remove();
  
        // product id
        $("[data-filter=.nid-4040]").parent().remove();
        $("[data-filter=.nid-3782]").parent().remove();
        $("[data-filter=.nid-4030]").parent().remove();
        //$('[data-filter=.nid-4029]').parent().remove();
        $("[data-filter=.nid-3765]").parent().remove();
        $("[data-filter=.nid-3907]").parent().remove();
        $("[data-filter=.nid-3951]").parent().remove();
        $("[data-filter=.nid-3787]").parent().remove();
        $("[data-filter=.nid-3928]").parent().remove();
        $("[data-filter=.nid-3972]").parent().remove();
        $("[data-filter=.nid-3857]").parent().remove();
        $("[data-filter=.nid-3892]").parent().remove();
        $("[data-filter=.nid-4059]").parent().remove();
        $("[data-filter=.nid-3809]").parent().remove();
        $("[data-filter=.nid-3912]").parent().remove();
        $("[data-filter=.nid-4010]").parent().remove();
        $("[data-filter=.nid-3903]").parent().remove();
        $("[data-filter=.nid-3811]").parent().remove();
        $("[data-filter=.nid-3806]").parent().remove();
        $("[data-filter=.nid-3736]").parent().remove();
        $("[data-filter=.nid-3959]").parent().remove();
        $("[data-filter=.nid-4022]").parent().remove();
        $("[data-filter=.nid-3935]").parent().remove();
        $("[data-filter=.nid-3792]").parent().remove();
        $("[data-filter=.nid-3726]").parent().remove();
        $("[data-filter=.nid-3815]").parent().remove();
        $("[data-filter=.nid-3908]").parent().remove();
        $("[data-filter=.nid-3894]").parent().remove();
        $("[data-filter=.nid-3863]").parent().remove();
        $("[data-filter=.nid-3766]").parent().remove();
        $("[data-filter=.nid-4150]").parent().remove();
        $("[data-filter=.nid-4735]").parent().remove();
        $("[data-filter=.nid-4736]").parent().remove();
        $("[data-filter=.nid-4815]").parent().remove();
        // $("[data-filter=.nid-4115]").parent().remove();
        $("[data-filter=.nid-5120]").parent().remove();
  
        // card id
        $("[data-filter=.card-3670]").parent().remove();
        $("[data-filter=.card-3672]").parent().remove();
        $("[data-filter=.card-2842]").parent().remove();
        $("[data-filter=.card-4110]").parent().remove();
        $("[data-filter=.card-4249]").parent().remove();
        $("[data-filter=.card-97]").parent().remove();
        $("[data-filter=.card-96]").parent().remove();
        $("[data-filter=.card-2953]").parent().remove();
        //$('[data-filter=.card-4003]').parent().remove();
        $("[data-filter=.card-4099]").parent().remove();
        $("[data-filter=.card-4243]").parent().remove();
        $("[data-filter=.card-4103]").parent().remove();
        $("[data-filter=.card-4104]").parent().remove();
        //$('[data-filter=.card-4692]').parent().remove();
        $("[data-filter=.card-4699]").parent().remove();
        $("[data-filter=.card-4047]").parent().remove();
        $("[data-filter=.card-4048]").parent().remove();
        //$('[data-filter=.card-4021]').parent().remove();
        // cards rmoved by Yogesh Chauhan
        $("[data-filter=.card-109]").parent().remove();
        $("[data-filter=.card-110]").parent().remove();
        $("[data-filter=.card-111]").parent().remove();
        $("[data-filter=.card-112]").parent().remove();
        $("[data-filter=.card-4021]").parent().remove();
  
        $("ul.tabs li.tab-link").live("click", function () {
          var tabId = $(this).attr("data-tab");
  
          $("ul.tabs li").removeClass("current");
          $(".tab-content").removeClass("current");
  
          $(this).addClass("current");
          $("#" + tabId).addClass("current");
        });
  
        $(".tab-add").click(function () {
          var tabId = $(".tab-link").length + 1;
  
          $(".tab-link").removeClass("current");
          $(".tab-content").removeClass("current");
  
          $(".tab-add").before(
            '<li class="tab-link current" data-tab="tab-' +
              tabId +
              '">Frame ' +
              tabId +
              "</li>"
          );
          $("#block-block-17 .tabs")
            .parent()
            .append(
              '<div id="tab-' +
                tabId +
                '" class="tab-content current">' +
                '<div class="config-loader" style="width: 1280px; height: 1050px; display: block; overflow: hidden;">' +
                '<iframe src="/configurator" frameborder="0" width="1280" height="1700" style="margin-top: -128px; overflow: hidden;" scrolling="no"></iframe>' +
                "</div>" +
                "</div>"
            );
        });
  
        // filter data
        $("[data-filter]").live("click", function () {
          var el, sub;
          $(this).parents(".filter").children().removeClass("ui-selected");
          $(this).parent().addClass("ui-selected");
          sel = $(this).data("filter");
          sub = sel.substring(1, 5); // by https://yogeshchauhan.com
          el = $(sel);
          wrapper = el.parents(".filtered");
          wrapper.children().hide();
          if (el.length == 0 && sub == "card") {
            // hide all rear modules by https://yogeshchauhan.com
            $(
              "#block-views-rear-module-selection-block div.view-rear-module-selection ul.filtered.filter"
            )
              .children()
              .each(function () {
                $(this).hide();
              });
  
            //hide rear module image and name by https://yogeshchauhan.com
            $(
              "#block-views-rear-module-list-block div.view-rear-module-list h4.choose-header"
            ).text("None");
  
            $(
              "#block-views-rear-module-list-block div.view-rear-module-list ul.filtered li"
            ).each(function () {
              $(this).hide();
            });
          } else {
            el.show().eq(0).find("[data-filter]").trigger("click");
          }
        });
  
        // hide Available options - commented by https://yogeshchauhan.com
        $(".view-card-selection li > div").live("click", function () {
          var selectedCard = $(this).attr("data-filter").split(".").pop();
          // console.log("selectedCard = " + selectedCard);
          $(".option")
            .parent()
            .each(function () {
              var cardName = $(this).attr("class");
              // console.log(cardName);
              if (selectedCard !== cardName) {
                // hide additional Available Options
                $(this).hide();
              }
            });
        });
  
        // assign 0 to any data power that is empty
        $(".ui-draggable[style*=display: none]").each(function () {
          var power = $(this).attr("data-power");
          if (power === "") {
            $(this).attr("data-power", 0);
          }
        });
  
        // Setup Starter Questions
        var hpfRadio = $(".hpf-9000"),
          og3Radio = $(".og3-fr"),
          smnpRadio = $(".smnp-support-block");
  
        hpfRadio.attr("checked", "checked");
        $("input[name=network-card][value=false]").parent().hide();
        $("input[name=network-card][value=true]").attr("checked", "checked");
  
        $("#block-views-options-selection-block").appendTo(
          ".view-rear-module-list .item-list .filtered"
        );
  
        // Setup Wattage Tally
        var tallyContainer = document.createElement("div"),
          tallyUsed = document.createElement("div"),
          tallyMax = document.createElement("div"),
          maxNum = 360;
  
        tallyContainer.className = "tally-container";
        tallyUsed.className = "tally-used";
        tallyUsed.innerHTML = 0;
        tallyMax.className = "tally-max";
        tallyMax.innerHTML = hpfRadio.val();
  
        tallyContainer.appendChild(tallyUsed);
        tallyContainer.appendChild(tallyMax);
  
        $(".page-configurator .entity").append(tallyContainer);
  
        var clearBtn = document.createElement("button"),
          clearBtnText = document.createTextNode("Clear");
  
        clearBtn.className = "clear-btn";
        clearBtn.appendChild(clearBtnText);
  
        $(".page-configurator .entity").append(clearBtn);
        $(".page-configurator .entity").append(
          '<button class="save-pdf">Save PDF</button>'
        );
  
        // save a pdf
        $(".save-pdf").click(function () {
          if ($(".clone").length === 0) {
            return window.top.alert("Place at least one rear module.");
          }
          $("html,body").scrollTop(0);
  
          window.top.jQuery("body").prepend('<div class="the-loader"></div>');
  
          cleanSlots();
          var pdf = new jsPDF("l", "pt", "a4");
          var configHeight = -188;
          configWidth = 68;
  
          if ($("#admin-menu").length) {
            configHeight = -215;
          }
  
          if (navigator.userAgent.indexOf("Firefox") != -1) {
            configHeight = -400;
          }
  
          pdf.canvas.height = 120;
          pdf.canvas.width = 72 * 8.5;
          pdf.canvas.getContext("2d").scale(0.6, 0.6);
          pdf.canvas.getContext("2d").translate(configWidth, configHeight);
  
          pdf.setFont("helvetica", "normal");
  
          pdf.setFontSize(10);
          // set numbers
          var widthNum = 130;
          for (var i = 20; i > 0; i--) {
            pdf.text(String(i), widthNum, 273);
            widthNum += 31;
          }
  
          pdf.setFontSize(5);
  
          // adjust titles
          var slots = window.frame_config.slots,
            widthTitle = 128;
          for (var i = 9; i >= 0; i--) {
            if (slots[i].title) {
              var titleHeight = i % 2 === 0 ? 122 : 114;
              pdf.text(slots[i].title, widthTitle, titleHeight);
              if (slots[i].width === 4) {
                widthTitle += 61;
                i--;
              }
              if (slots[i].width === 6) {
                widthTitle += 122;
                i -= 2;
              }
            }
            widthTitle += 61;
          }
  
          window.frame_config.productList = {};
          // set frame config values
          var frame = "none",
            power = "none",
            network = "none",
            snmp = "none",
            support = "none",
            powerUsed = "0",
            powerMax = "360",
            ip =
              $(".ip-address").val() === "IP Address"
                ? "none"
                : $(".ip-address").val();
  
          if ($("[name=frame-select]:checked").hasClass("hpf-9000")) {
            frame = "HPF-9000";
            powerMax = "360";
            if ($("[name=network-card]:checked").val() === "true") {
              network = "true";
              frame = "HPF-9000-N";
            }
            window.frame_config.productList[frame] = 1;
            if ($("[name=power-supply]:checked").val() === "true") {
              power = "PS-9000";
              window.frame_config.productList[power] = 1;
            }
            if ($("[name=snmp-support]:checked").val() === "true") {
              snmp = "SNMP-HPF-FC";
              window.frame_config.productList[snmp] = 1;
            }
            if ($("[name=support-bracket]:checked").val() === "true") {
              support = "9000-FSB";
              window.frame_config.productList[support] = 1;
            }
          } else {
            frame = "OGX-FR-C-P";
            powerMax = "460";
            if ($("[name=network-card]:checked").val() === "true") {
              network = "true";
              frame = "OGX-FR-CN-P";
              if ($("[name=snmp-support]:checked").val() === "true") {
                frame = "OGX-FR-CNS-P";
              }
            }
            window.frame_config.productList[frame] = 1;
            if ($("[name=power-supply]:checked").val() === "true") {
              power = "PS-OGX";
              window.frame_config.productList[power] = 1;
            }
            if ($("[name=support-bracket]:checked").val() === "true") {
              support = "FSB-OGX";
              window.frame_config.productList[support] = 1;
            }
          }
  
          createProductList();
          pdf.setFontSize(10);
          pdf.setFont("helvetica", "bold");
          pdf.text("Product List", 10, 300);
          var sortedProductList = sortObj(window.frame_config.productList),
            width = 10,
            height = 320;
  
          pdf.setFontStyle("normal");
          pdf.setFontSize(10);
          sortedProductList.forEach(function (product) {
            pdf.text(product[1] + "x " + product[0], width, height);
            height += 15;
          });
  
          $(".rm-title").hide();
          $(".rm-options").hide();
          $(".drawer").hide();
          $(".expansion-rm-list").hide();
  
          pdf.setFont("helvetica", "normal");
  
          // html to pdf function
          html2pdf($(".slots")[0], pdf, function () {
            // frame info
            //pdf.text('Frame Ordering Info', 40, 40);
            pdf.setFontSize(12);
            pdf.setFont("helvetica", "bold");
            pdf.text("Frame:", 40, 40);
  
            if ($("[name=frame-select]:checked").val() === "360") {
              pdf.setFontStyle("normal");
              pdf.text(frame, 150, 40);
              pdf.setFontStyle("bold");
              pdf.text("Power Supply:", 40, 55);
              pdf.setFontStyle("normal");
              pdf.text(power, 150, 55);
              pdf.setFontStyle("bold");
              pdf.text("Support Brackets:", 40, 70);
              pdf.setFontStyle("normal");
              pdf.text(support, 150, 70);
              //pdf.text('Power Used:', 40, 90);
              //pdf.text(window.frame_config.power + ' / ' + powerMax, 150, 90);
              if (!(network === "none")) {
                pdf.setFontStyle("bold");
                pdf.text("SNMP:", 40, 85);
                pdf.setFontStyle("normal");
                pdf.text(snmp, 150, 85);
                pdf.setFontStyle("bold");
                pdf.text("IP Address:", 40, 100);
                pdf.setFontStyle("normal");
                pdf.text(ip, 150, 100);
              }
            } else {
              pdf.setFontStyle("normal");
              pdf.text(frame, 150, 40);
              pdf.setFontStyle("bold");
              pdf.text("Power Supply:", 40, 55);
              pdf.setFontStyle("normal");
              pdf.text(power, 150, 55);
              pdf.setFontStyle("bold");
              pdf.text("Support Brackets:", 40, 70);
              pdf.setFontStyle("normal");
              pdf.text(support, 150, 70);
              if (network !== "none") {
                pdf.setFontStyle("bold");
                pdf.text("IP Address:", 40, 85);
                pdf.setFontStyle("normal");
                pdf.text(ip, 150, 85);
              }
              //pdf.text('Power Used:', 40, 95);
              //pdf.text(window.frame_config.power + ' / ' + powerMax, 140, 95);
            }
  
            pdf.setFontSize(10);
            var width = 200,
              height = 320,
              slotsIndex = 20;
  
            pdf.setFontStyle("bold");
            pdf.text("Slots", width, 300);
            pdf.text("Rear Modules", width + 70, 300);
            pdf.text("Cards", width + 260, 300);
            pdf.text("Options", width + 380, 300);
            pdf.text("Slot Locations", width + 520, 300);
  
            for (var i = 9; i >= 0; i--) {
              var rm =
                  typeof slots[i].title !== "undefined" ? slots[i].title : "",
                card = typeof slots[i].card !== "undefined" ? slots[i].card : "",
                options =
                  typeof slots[i].options !== "undefined" ? slots[i].options : "",
                location =
                  typeof slots[i].primary !== "undefined" ? slots[i].primary : "",
                dual = typeof slots[i].dual !== "undefined" ? slots[i].dual : "",
                myWidth =
                  typeof slots[i].width !== "undefined" ? slots[i].width : "";
  
              pdf.setFontStyle("bold");
              pdf.rect(width, height - 13, 600, 0.03);
              pdf.setFillColor(50);
              pdf.text(
                slotsIndex + ", " + (slotsIndex - 1) + ": ",
                width,
                height
              );
  
              pdf.setFontStyle("normal");
              pdf.text(rm, width + 70, height);
              if (dual && dual !== "") {
                pdf.text(String(card) + "(x2)", width + 260, height);
              } else {
                if (myWidth === 4) {
                  pdf.text(String(card), width + 260, height + 20);
                } else if (myWidth === 6) {
                  pdf.text(String(card), width + 260, height + 40);
                } else {
                  pdf.text(String(card), width + 260, height);
                }
              }
              pdf.text(options, width + 380, height);
              pdf.text(oddOrEven(location, dual), width + 570, height);
  
              height += 20;
              slotsIndex -= 2;
            }
  
            var docName =
              $("#frame-title").val() === ""
                ? "frame_configuration"
                : $("#frame-title").val();
  
            pdf.setFontSize(18);
            pdf.setFontStyle("bold");
            pdf.text(docName, 40, 20);
  
            if (
              window.top.allFrameState === true &&
              typeof window.top.allFrameState !== "undefined"
            ) {
              var thePdf = btoa(pdf.output());
              var doc = {
                pdf: thePdf,
                title: docName,
              };
  
              window.top.multi_config.push(doc);
  
              // to thwart this async promise
              if (window.top.numOfPdfs < window.top.numOfFrames) {
                window.top.numOfPdfs++;
                var frameIndex = window.top.numOfPdfs - 1;
                // async click next iframe
                window.top.clickFrame(frameIndex);
              } else {
                window.top.setSession();
              }
            } else {
              pdf.save(docName + ".pdf");
            }
  
            // re show some stuff
            $(".rm-title").show();
            $(".rm-options").show();
            $(".expansion-rm-list").show();
            window.top.jQuery(".the-loader").remove();
          });
        });
  
        // trigger a click on all frames
        $(".all-frames").click(function () {
          if (
            $("iframe").contents().find(".clone").length === 0 ||
            $("iframe").length === 0
          ) {
            return window.top.alert("Place at least one rear module.");
          } else {
            $("body").prepend(
              '<div class="the-loader"><p class="loading-text">Please do not refresh page.<br>This may take a while.</p></div>'
            );
            $(".tab-content").addClass("current");
            $(this).attr("disabled", true);
  
            window.top.multi_config = [];
            window.top.numOfFrames = $("iframe").length;
            window.top.numOfPdfs = 1;
            window.top.allFrameState = true;
            window.top.setSession = setSession;
            window.top.clickFrame = clickFrame;
            setSession();
            clickFrame(0);
          }
        });
  
        $(".send-configs-submit").click(function (event) {
          event.preventDefault();
  
          var data = {
            name: $("#name-input").val(),
            email: $("#email-input").val(),
            org: $("#organization-input").val() || "none",
            address: $("#address-input").val() || "none",
            phone: $("#phone-input").val() || "none",
            comments: $("#add-input").val() || "none",
          };
  
          if (data.name !== "" && data.email !== "") {
            $("body").prepend(
              '<div class="the-loader"><p class="loading-text">Please do not refresh page.<br>This may take a while.</p></div>'
            );
            $.post("/sendmail.php", data, function () {
              alert("email sent");
              $('.the-loader').remove();
              // window.top.location = 'http://' + document.domain + '/configurations-sent';
            });
          } else {
            console.log("No name or email");
          }
        });
  
        function clickFrame(number) {
          $("iframe:eq(" + String(number) + ")")
            .contents()
            .find(".save-pdf")
            .trigger("click");
        }
  
        function setSession() {
  
      console.log("/configuration-sales");
  
          var jsonConfigs = JSON.stringify(window.top.multi_config);
          $.post("/setdata.php", { data: jsonConfigs }, function () {
           // window.top.location =
            //  "http://" + document.domain + "/configuration-sales";
          var newUrl = new URL("/configuration-sales",window.origin);
          window.top.location = newUrl.href;
            window.top.allFrameState = false;
  
            //$('.the-loader').remove();
            $(".all-frames").attr("disabled", false);
            $(".tab-content").removeClass("current");
            $("#" + $(".tab-link.current").attr("data-tab")).addClass("current");
          });
        }
  
        function oddOrEven(num, dual) {
          if (
            isNaN(num) ||
            num === null ||
            typeof num === "undefined" ||
            num === ""
          ) {
            return "";
          }
          if (dual && dual !== "") {
            return "Both";
          }
          if (num % 2 === 0) {
            return "Even";
          } else {
            return "Odd";
          }
        }
  
        function createProductList() {
          var slots = window.frame_config.slots,
            rms = [],
            cards = [],
            rmCounts = {},
            cardCounts = {};
  
          // create rm array
          for (var i = 0; i < slots.length; i++) {
            if (
              typeof slots[i].title !== "undefined" &&
              typeof slots[i].width !== "undefined"
            ) {
              /*if (slots[i].width === 4) {
                i += 1;
                rms.push(slots[i].title);
              } else if (slots[i].width === 6) {
                i += 2;
                rms.push(slots[i].title);
              } else {*/
              //}
              rms.push(slots[i].title);
            }
          }
          // create card array
          for (var i = 0; i < slots.length; i++) {
            if (typeof slots[i].card !== "undefined") {
              var card = slots[i].card;
              if (slots[i].dual && typeof slots[i].dual !== "undefined") {
                cards.push(card);
                cards.push(card);
              } else {
                cards.push(card);
              }
            }
          }
          rms.forEach(function (rm) {
            rmCounts[rm] = (rmCounts[rm] || 0) + 1;
          });
          cards.forEach(function (card) {
            cardCounts[card] = (cardCounts[card] || 0) + 1;
          });
          var counts = merge_options(rmCounts, cardCounts);
          window.frame_config.productList = merge_options(
            window.frame_config.productList,
            counts
          );
        }
  
        function merge_options(obj1, obj2) {
          var obj3 = {};
          for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
          }
          for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
          }
          return obj3;
        }
  
        function sortObj(obj) {
          var sortable = [];
          for (var key in obj) {
            sortable.push([key, obj[key]]);
          }
  
          sortable.sort(function (a, b) {
            return b[1] - a[1];
          });
  
          return sortable;
        }
  
        function toObject(arr) {
          var rv = {};
          for (var i = 0; i < arr.length; ++i)
            if (arr[i] !== undefined) rv[i] = arr[i];
          return rv;
        }
  
        $(".accepted-rm").live("click", function () {
          var title = $(this).text(),
            loc = $(this).closest(".slot");
          var clone = $(".view-rear-module-list").find(
            ".ui-draggable[data-title=" + title + "]"
          );
          clone.simulate("drag-n-drop", { dragTarget: loc });
          $(".slot").removeClass(".ui-selected");
        });
  
        // show rear module name in filtered list
        $(".view-rear-module-selection li div").click(function () {
          var rmName = $(this).text();
          // console.log("selectedModule = " + rmName);
          $(".view-rear-module-list .choose-header").html("").append(rmName);
  
          $(".single-card-container input").attr("checked", false);
          var selectedRM = $($(this).attr("data-filter") + " .ui-draggable");
          if (
            selectedRM.attr("data-secondary") !== "" &&
            typeof selectedRM.attr("data-secondary") !== "undefined"
          ) {
            $(".single-card-container").show();
          } else {
            $(".single-card-container").hide();
          }
        });
  
        // change image if redundant power supply
        $("[name=power-supply]").click(function () {
          if ($("[name=power-supply]:checked").val() === "true") {
            $(".noredundant-power-img").hide();
            $(".redundant-power-img").show();
          } else {
            $(".redundant-power-img").hide();
            $(".noredundant-power-img").show();
          }
        });
  
        // attach options as a data attribute
        var optionsVals = [],
          rmVals = "";
        $(".option-checkbox").change(function () {
          if (this.checked) {
            optionsVals.push($(this).val());
            var acceptedRM = $(this).parent().parent().attr("data-rear-modules");
            if (acceptedRM !== "" && typeof acceptedRM !== "undefined") {
              rmVals = acceptedRM;
            }
          } else {
            rmVals = "";
            optionsVals.splice(optionsVals.indexOf($(this).val()), 1);
          }
          var optionsValsString = optionsVals.join(", ");
          $('[style="display: list-item;"] > .ui-draggable').attr(
            "data-options",
            optionsValsString
          );
          $('[style="display: list-item;"] > .ui-draggable').attr(
            "data-expanse-modules",
            rmVals
          );
        });
  
        // filters setup questions
        $("input:radio[name=network-card]").click(function () {
          if ($("[name=network-card]:checked").val() === "true") {
            smnpRadio.show();
          } else {
            smnpRadio.hide();
          }
  
          // disable first slot for network card
          /*if ($('[name=network-card]:checked').val() === 'true') {
            if ($('.droppable-rear-module:first').children('.clone').length) {
              var data = Object($('.droppable-rear-module:first').children('.clone').data());
              window.frame_config.power -= data.power;
              tallyUsed.innerHTML = window.frame_config.power;
              $('#edit-field-power-used').find('input').val(window.frame_config.power).trigger('change');
              $('.droppable-rear-module:first').children('.clone').remove();
            }
            $('.droppable-rear-module:first').droppable('disable');
            $('.droppable-rear-module:first').append('<div class="network-card-slot">Network<br />Card<div>');
            window.frame_config.slots[9] = {title: 'Network Card'};
          } else {
            if (typeof window.frame_config != 'undefined') {
              window.frame_config.slots[9] = {};
            }
            $('.droppable-rear-module:first').droppable('enable');
            $('.network-card-slot').remove();
          }*/
        });
  
        // filters setup questions
        $("input:radio[name=frame-select]").click(function () {
          if (hpfRadio.is(":checked")) {
            $("input[name=network-card][value=false]").parent().hide();
            $("input[name=network-card][value=true]").attr("checked", "checked");
            smnpRadio.show();
  
            tallyMax.innerHTML = hpfRadio.val();
            maxNum = hpfRadio.val();
          }
          if (og3Radio.is(":checked")) {
            $("input[name=network-card][value=false]").parent().show();
            $("input[name=network-card][value=true]").attr("checked", "");
  
            tallyMax.innerHTML = og3Radio.val();
            maxNum = og3Radio.val();
            smnpRadio.hide();
            if ($("[name=network-card]:checked").val() === "true") {
              smnpRadio.show();
            }
          }
          $("#edit-field-power-used").find("input").trigger("change");
        });
  
        // clear all RMs from the frame
        $(".clear-btn").click(function () {
          $(".clone").remove();
          $(".expansion-rm-list").remove();
          window.frame_config.power = 0;
          tallyUsed.innerHTML = 0;
          $("#edit-field-power-used")
            .find("input")
            .val(window.frame_config.power)
            .trigger("change");
          for (i = 0; i < window.frame_config.slots.length; i++) {
            window.frame_config.slots[i] = {};
          }
        });
  
        // show/hide the delete individual remove button
        $(".clone").live({
          mouseenter: function () {
            $(this).find(".drawer").show();
          },
          mouseleave: function () {
            $(this).find(".drawer").hide();
          },
        });
  
        // remove single rm
        $(".remove-rm").live("click", function () {
          var rm = $(this).closest(".clone");
          var data = Object(rm.data());
          window.frame_config.power -= data.power;
          tallyUsed.innerHTML = window.frame_config.power;
          $("#edit-field-power-used")
            .find("input")
            .val(window.frame_config.power)
            .trigger("change");
          for (i = 0; i < window.frame_config.slots.length; i++) {
            if (window.frame_config.slots[i].expansion === "base") {
              window.frame_config.slots[i + 1] = {};
            }
            if (window.frame_config.slots[i] === data) {
              window.frame_config.slots[i] = {};
            }
          }
          if (rm.parent().prev().children(".expansion-rm-list").length) {
            rm.parent().prev().empty();
          }
          rm.remove();
        });
  
        // disable all slots when all power has been used
        $("#edit-field-power-used-und-0-value").change(function () {
          var tally = Number($(".tally-used").text());
          if (tally > maxNum) {
            $(".tally-container").css({ color: "#F44336" });
            setTimeout(function () {
              $(".droppable-rear-module:not(:has(*))").droppable("disable");
            }, 100);
          } else {
            $(".tally-container").css({ color: "#0039a6" });
            $(".droppable-rear-module:not(:has(*))").droppable("enable");
          }
        });
  
        function cleanSlots() {
          // loop backwards for printing purposes
          var slots = window.frame_config.slots;
          for (var i = 9; i >= 0; i--) {
  
            var slot = slots[i];
  
            if (slot.width === 4) {
              slots[i - 1] = { title: "<" + slot.title + ">" };
            }
            if (slot.width === 6) {
              slots[i - 2] = { title: "<" + slot.title + ">" };
              slots[i - 1] = { title: "<" + slot.title + ">" };
            }
          }
        }
  
        function convertToBtns(str) {
          var arr = str.split(", "),
            formatArr = [];
          for (var i = 0; i < arr.length; i++) {
            formatArr.push(
              '<div class="accepted-rm">' + String(arr[i]) + "</div>"
            );
          }
          return formatArr.join("");
        }
  
        // setup configurator
        function setup_configurator() {
          var adj_draggable_hitbox, make_slots, update_form;
  
          // Update form
          update_form = function () {
            var delta, i, slot, _ref, _ref2;
            window.frame_config.power = 0;
            var sent = 0;
            $(".slot").each(function () {
              var rear_module, rear_module_element, slot_num;
              slot_num = $(this).data("slot");
              rear_module_element = $(this).find(
                "[data-nid]:not(.ui-draggable-dragging)"
              );
              rear_module = Object(rear_module_element.data());
              $(this).removeClass("ui-selected");
  
              // related card power in case cdi starts using card power
              var card_power = $(".view-card-selection .ui-selected > div").data(
                "power"
              );
              var power = function () {
                if (card_power === undefined) {
                  return rear_module.power;
                } else {
                  if (card_power > rear_module.power) {
                    return card_power;
                  } else {
                    return rear_module.power;
                  }
                }
              };
  
              if ($(this).hasClass("dragging")) rear_module = Object;
              if (rear_module.power !== void 0) {
                window.frame_config.power += rear_module.power;
              }
              // set wattage tally
              tallyUsed.innerHTML = window.frame_config.power;
              if (sent === 0) {
                window.frame_config.slots[slot_num - 1] = rear_module;
              }
              return $("#edit-field-slot-" + slot_num)
                .find("select")
                .val(rear_module.nid);
            });
            for (
              i = _ref = window.frame_config.slots.length - 1;
              _ref <= 0 ? i <= 0 : i >= 0;
              _ref <= 0 ? i++ : i--
            ) {
              slot = window.frame_config.slots[i];
              if (slot.width !== void 0) {
                for (
                  delta = 1, _ref2 = slot.width / 2;
                  1 <= _ref2 ? delta < _ref2 : delta > _ref2;
                  1 <= _ref2 ? delta++ : delta--
                ) {
                  window.frame_config.slots[i + delta] = slot;
                }
              }
            }
            $("#edit-field-power-used")
              .find("input")
              .val(window.frame_config.power)
              .trigger("change");
          };
  
          // Make slots
          make_slots = function () {
            var form, i, _results;
            form = $(form_sel);
            form.children().hide();
            _results = [];
            for (i = 10; i >= 1; i--) {
              _results.push(
                form.append(
                  $("<div/>", {
                    class:
                      "slot inline-block vertical-align-top droppable-rear-module",
                  }).data("slot", i)
                )
              );
            }
            return _results;
          };
  
          // setup
          $("[data-filter]").first().trigger("click");
          make_slots();
          $(".filter, .filtered")
            .parents(".block")
            .addClass("inline-block vertical-align-top");
  
          // draggable hitbox size
          adj_draggable_hitbox = function (helper) {
            var width;
            width = $(helper).data("width") / 2;
            if (width > 1) {
              return $(helper).css(
                "width",
                (((width - 1) * 2 + 1) * 107).toString() + "px"
              );
            }
          };
  
          // draggable
          $('[data-draggable="rear-module"]').draggable({
            helper: "clone",
            start: function (event, ui) {
              adj_draggable_hitbox(ui.helper);
  
              // daughter card stuff
              var daughter = $(".view-card-selection li.ui-selected div").attr(
                  "data-daughter"
                ),
                num = $(this).attr("data-primary");
              if (daughter === "true") {
                $(this).attr("data-isDaughter", true);
                if (oddOrEven(num, "") === "Even") {
                  if (!$(".droppable-rear-module:first").children().length)
                    $(".droppable-rear-module:first").droppable("disable");
                  $(".clone")
                    .not($(this))
                    .each(function () {
                      var num = $(this).attr("data-primary");
                      if (oddOrEven(num, "") === "Odd") {
                        if ($(this).parent().next().children().length === 0) {
                          $(this).parent().next().droppable("disable");
                        }
                      }
                    });
                } else {
                  if (!$(".droppable-rear-module:last").children().length)
                    $(".droppable-rear-module:last").droppable("disable");
                  $(".clone")
                    .not($(this))
                    .each(function () {
                      var num = $(this).attr("data-primary");
                      if (oddOrEven(num, "") === "Even") {
                        if ($(this).parent().next().children().length === 0) {
                          $(this).parent().prev().droppable("disable");
                        }
                      }
                    });
                }
              } else {
                $(this).attr("data-isDaughter", false);
              }
  
              var card = String(
                $(".view-card-selection li.ui-selected").find("h4").text()
              );
              $(this).attr("data-card", card);
              if (
                $(this).attr("data-secondary") !== "" &&
                typeof $(this).attr("data-secondary") !== "undefined"
              ) {
                $(this).attr("data-dual", true);
                $(this)
                  .find(".drawer-card")
                  .empty()
                  .append("Cards<br>" + card + "<br>" + card);
                if ($(".single-card").is(":checked")) {
                  $(this).attr("data-dual", false);
                  $(this)
                    .find(".drawer-card")
                    .empty()
                    .append("Card<br>" + card);
                }
              } else {
                if ($(this).attr("data-isDaughter") === "true") {
                  $(this)
                    .find(".drawer-card")
                    .empty()
                    .append("Card<br>" + card + "<br>(Daughter Board)");
                } else {
                  $(this)
                    .find(".drawer-card")
                    .empty()
                    .append("Card<br>" + card);
                }
              }
            },
            stop: function (event, ui) {
              $(".rm-title").html("");
              $(".droppable-rear-module").droppable("enable");
  
              $(".clone").each(function (element) {
                // enable either the left or right cards cause daughter boards
                var title = String($(this).data("title"));
                $(this).children(":first").children(":first").append(title);
                if (
                  typeof $(this).data("options") !== "undefined" &&
                  $(this).data("options") !== ""
                ) {
                  var options = String($(this).data("options"));
                  //$(this).append('<div class="rm-options">' + options + '</div>');
                  $(this)
                    .find(".drawer-options")
                    .empty()
                    .append("Options<br>" + options);
                }
              });
              optionsVals = [];
              $(".option-checkbox").attr("checked", false);
              $('[style="display: list-item;"] > .ui-draggable').attr(
                "data-options",
                ""
              );
              $('[style="display: list-item;"] > .ui-draggable').attr(
                "data-expanse-modules",
                ""
              );
              $(".rm-title").each(function () {
                if ($(this).text().length >= 17) {
                  $(this).css({ fontSize: "8px" });
                }
              });
              $(".droppable-rear-module").droppable("enable");
            },
          });
          $(".droppable-rear-module").droppable({
            hoverClass: "ui-selected",
            over: function (event, ui) {
              var el, i, _ref, _results;
              el = $(this);
              el.parent().children().removeClass("ui-selected-extra");
              _results = [];
              for (
                i = 1, _ref = $(ui.draggable).data("width") / 2;
                1 <= _ref ? i < _ref : i > _ref;
                1 <= _ref ? i++ : i--
              ) {
                _results.push((el = el.prev().addClass("ui-selected-extra")));
              }
              var num = $(ui.draggable).attr("data-primary"),
                daughter = $(ui.draggable).attr("data-isDaughter");
              if (daughter === "true") {
                if (oddOrEven(num, "") === "Even") {
                  if (!$(".droppable-rear-module:first").children().length)
                    $(".droppable-rear-module:first").droppable("disable");
                  $(".clone").each(function () {
                    var num = $(this).attr("data-primary");
                    if (
                      oddOrEven(num, "") === "Odd" &&
                      $(this).parent().children().length < 2
                    ) {
                      if ($(this).parent().next().children().length === 0) {
                        $(this).parent().next().droppable("disable");
                      }
                    }
                  });
                } else {
                  if (!$(".droppable-rear-module:last").children().length)
                    $(".droppable-rear-module:last").droppable("disable");
                  $(".clone").each(function () {
                    var num = $(this).attr("data-primary");
                    if (
                      oddOrEven(num, "") === "Even" &&
                      $(this).parent().children().length < 2
                    ) {
                      if ($(this).parent().prev().children().length === 0) {
                        $(this).parent().prev().droppable("disable");
                      }
                    }
                  });
                }
              } else {
                if (oddOrEven(num, "") === "Even") {
                  $(".clone[data-isDaughter=true]").each(function () {
                    var num = $(this).attr("data-primary");
                    if (
                      oddOrEven(num, "") === "Odd" &&
                      $(this).parent().children().length < 2
                    ) {
                      if ($(this).parent().next().children().length === 0) {
                        $(this).parent().next().droppable("disable");
                      }
                    }
                  });
                } else {
                  $(".clone[data-isDaughter=true]").each(function () {
                    var num = $(this).attr("data-primary");
                    if (
                      oddOrEven(num, "") === "Even" &&
                      $(this).parent().children().length < 2
                    ) {
                      if ($(this).parent().prev().children().length === 0) {
                        $(this).parent().prev().droppable("disable");
                      }
                    }
                  });
                }
              }
  
              var options = $(ui.draggable).attr("data-options"),
                expansion = $(ui.draggable).attr("data-expansion");
              // for base with options
              if (expansion === "base") {
                if (options !== "" && typeof options !== "undefined") {
                  $(".ui-droppable:first").droppable("disable");
                  if ($(ui.draggable).hasClass("clone")) {
                    $(ui.draggable)
                      .parent()
                      .prev()
                      .find(".expansion-rm-list")
                      .remove();
                    var expansion = $(ui.draggable)
                      .parent()
                      .prev()
                      .find(".clone[data-expansion=expansion]");
                    var data = Object(expansion.data());
                    for (var i = 0; i < window.frame_config.slots.length; i++) {
                      if (window.frame_config.slots[i] == data) {
                        window.frame_config.slots[i] = {};
                      }
                    }
                    expansion.remove();
                  }
                  $(".clone").each(function () {
                    if ($(this).parent().children().length < 2) {
                      if ($(this).parent().next().children().length === 0) {
                        $(this).parent().next().droppable("disable");
                        if (
                          $(this).parent().prev().children(".expansion-rm-list")
                            .length === 1
                        ) {
                          $(this).parent().prev().droppable("disable");
                        }
                      }
                    }
                  });
                  // for bases without options
                } else {
                  $(".clone").each(function () {
                    if (
                      $(this).attr("data-options") !== "" &&
                      typeof $(this).attr("data-options") !== "undefined"
                    ) {
                      if (
                        $(this).parent().prev().children(".expansion-rm-list")
                          .length === 1
                      ) {
                        $(this).parent().prev().droppable("disable");
                      }
                    }
                  });
                }
                // for expansions
              } else if (expansion === "expansion") {
                $(".droppable-rear-module").droppable("disable");
                $(".clone").each(function () {
                  if ($(this).attr("data-expansion") === "base") {
                    if (
                      $(this).attr("data-options") !== "" &&
                      typeof $(this).attr("data-options") !== "undefined"
                    ) {
                      if (
                        $(this).parent().prev().children(".expansion-rm-list")
                          .length === 1
                      ) {
                        var name = $(ui.draggable).attr("data-title"),
                          dragNames = $(this).attr("data-expanse-modules");
  
                        var arr = dragNames.split(", ");
  
                        for (var i = 0; i < arr.length; i++) {
                          if (arr[i] == name) {
                            $(this).parent().prev().droppable("enable");
                          }
                        }
                      }
                    }
                  }
                });
  
                // for all other cards
              } else {
                $(".clone").each(function () {
                  if ($(this).attr("data-expansion") === "base") {
                    if (
                      $(this).attr("data-options") !== "" &&
                      typeof $(this).attr("data-options") !== "undefined"
                    ) {
                      if (
                        $(this).parent().prev().children(".expansion-rm-list")
                          .length === 1
                      ) {
                        $(this).parent().prev().droppable("disable");
                      }
                    }
                  }
                });
              }
  
              return _results;
            },
            out: function (event, ui) {
              var el;
              el = $(this);
              if (el.parent().find(".ui-selected").length === 0) {
                return el.parent().children().removeClass("ui-selected-extra");
              }
            },
            accept: function (draggable) {
              var has_base,
                i,
                other_slot,
                req_base,
                slot,
                slot_num,
                slots,
                width,
                _i,
                _results;
              window.frame_config ||
                (window.frame_config = Object({
                  slots: (function () {
                    var _results;
                    _results = [];
                    for (i = 1; i <= 10; i++) {
                      _results.push(Object);
                    }
                    return _results;
                  })(),
                  power: 0,
                }));
              slots = window.frame_config.slots;
              slot_num = $(this).data("slot") - 1;
              slot = slots[slot_num];
              width = $(draggable).data("width") / 2;
              req_base = $(draggable).data("expansion") === "expansion";
              other_slot = slots[slot_num - 1];
              has_base =
                slot_num > 0 &&
                other_slot.expansion === "base" &&
                other_slot.primary === $(draggable).data("primary");
  
              return (
                slot.nid === void 0 &&
                width + slot_num <= 10 &&
                function () {
                  _results = [];
                  for (
                    var _i = 1;
                    1 <= width ? _i < width : _i > width;
                    1 <= width ? _i++ : _i--
                  ) {
                    _results.push(_i);
                  }
                  return _results;
                }
                  .apply(this)
                  .every(function (i) {
                    return slots[slot_num + i].nid === void 0;
                  }) &&
                true /*has_base || req_base*/
              );
            },
            drop: function (event, ui) {
              $(this).parent().children().removeClass("ui-selected-extra");
              $(ui.draggable).removeClass("marked");
              if ($(ui.draggable).hasClass("clone")) {
                $(ui.draggable).appendTo($(this));
              } else {
                $(ui.draggable)
                  .clone()
                  .addClass("clone")
                  .appendTo($(this))
                  .draggable({
                    helper: "clone",
                    start: function (event, ui) {
                      adj_draggable_hitbox(ui.helper);
                      $(this).parent().addClass("dragging");
  
                      update_form();
                    },
                    stop: function (event, ui) {
                      $(this).removeClass("marked");
                      $(this)
                        .parent()
                        .parent()
                        .children()
                        .removeClass("dragging");
                      $(".droppable-rear-module").droppable("enable");
                      update_form();
                    },
                  });
              }
              $(".droppable-rear-module").droppable("enable");
  
              var options = $(ui.draggable).attr("data-options"),
                expansion = $(ui.draggable).attr("data-expansion");
              if (options !== "" && typeof options !== "undefined") {
                if (expansion !== "" && typeof expansion !== "undefined") {
                  if (expansion === "base") {
                    var acceptedRM = $(ui.draggable).attr("data-expanse-modules");
                    $(this)
                      .prev()
                      .append(
                        "<div class=expansion-rm-list>" +
                          "Choose an Expansion Rear Module:<br><br>" +
                          convertToBtns(acceptedRM) +
                          "</div>"
                      );
                  }
                }
              }
              update_form();
            },
          });
        }
        if ($("body").hasClass("page-eform-submit-" + sel)) {
          setup_configurator();
          $(".slot").wrapAll('<div class="slots" />');
  
          // add frame images
          $(".slots").append(
            '<img draggable="false" class="primary-power-img" src="/sites/all/themes/cdi/images/HPF-9000_primary.png" />'
          );
          $(".slots").prepend(
            '<img draggable="false" class="noredundant-power-img" src="/sites/all/themes/cdi/images/HPF-9000_noredundant.png" />'
          );
          $(".slots").prepend(
            '<img draggable="false" class="redundant-power-img" src="/sites/all/themes/cdi/images/HPF-9000_redundant.png" />'
          );
        }
      });
    };
  
    jQuery(document).ready(function () {
      wrapper(jQuery);
      if (jQuery("#admin-menu").length) {
        jQuery(".all-frames").css({ bottom: "7px" });
      }
    });
  }.call(this));