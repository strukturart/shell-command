$(document).ready(function() {


    var i = 0;
    var z = -1;
    var finderNav_tabindex = -1;


    /////////////////////////
    function finder() {


        var finder = new Applait.Finder({
            type: "sdcard",
            debugMode: true
        });


        finder.on("empty", function(needle) {
            alert("no sdcard found");
            return;
        });

        finder.search("cmd.json");



        finder.on("fileFound", function(file, fileinfo, storageName) {

            var reader = new FileReader()


            reader.onerror = function(event) {
                alert('shit happens')
                reader.abort();
            };

            reader.onloadend = function(event) {

                search_result = event.target.result

                //check if json valid
                var printError = function(error, explicit) {
                    console.log("[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}");
                }

                try {

                } catch (e) {
                    if (e instanceof SyntaxError) {
                        alert("Json file is not valid");
                        return;
                    } else {

                    }

                }
                var data = JSON.parse(search_result);
                $.each(data, function(i, item) {
                    finderNav_tabindex++;
                    $("div#app-list").append('<div class="items" tabindex="' + finderNav_tabindex + '"  data-cmd="' + item.cmd + '">' + item.cmd_name + '</div>');

                });

                $('div#finder').find('div.items[tabindex=0]').focus();

            };
            reader.readAsText(file)
        });


    }


    finder()



    ////////////////////////
    //NAVIGATION
    /////////////////////////



    function nav(move) {
        var items = document.querySelectorAll('.items');
        if (move == "+1" && i < finderNav_tabindex) {
            i++

            if (i <= finderNav_tabindex) {
                var items = document.querySelectorAll('.items');
                var targetElement = items[i];
                targetElement.focus();

            }
        }

        if (move == "-1" && i > 0) {
            i--
            if (i >= 0) {
                var items = document.querySelectorAll('.items');
                var targetElement = items[i];
                targetElement.focus();

            }
        }

    }



    /////////////////
    //VIBRATION/////
    ///////////////


    var vibrateInterval;

    // Starts vibration at passed in level
    function startVibrate(duration) {
        navigator.vibrate(duration);
    }

    // Stops vibration
    function stopVibrate() {
        // Clear interval and stop persistent vibrating
        if (vibrateInterval) clearInterval(vibrateInterval);
        navigator.vibrate(0);
    }

    // Start persistent vibration at given duration and interval
    // Assumes a number value is given
    function startPersistentVibrate(duration, interval) {
        vibrateInterval = setInterval(function() {
            startVibrate(duration);
        }, interval);
    }




    //////////////////
    //Execute command
    //////////////////

    function exec_cmd() {



        var selected_button = $(":focus")[0];
        var cmd = selected_button.getAttribute('data-cmd');
        cmd = "echo `date +%d-%m-%y`&&" + cmd + " > /storage/sdcard/cmd/cmd_log.txt 2>&1";

        $("div#output").text("command is executed " + cmd)

        var extension = navigator.kaiosExtension || navigator.engmodeExtension;
        if (extension) {
            var executor = extension.startUniversalCommand(cmd, true);
            executor.onsuccess = function(e) {
                setTimeout(function() {
                    $("div#output").text("success")
                    startVibrate([100, 100, 200, 100, 300]);

                }, 4000);
            };

            executor.onerror = function(e) {
                $("div#output").text("error")
            };
        } else {
            alert('no extension object available');
        }



    }



    function show_man() {
        $("div#man-page").css('display', 'block')
        window_status = true;
    }

    function close_man() {
        $("div#man-page").css('display', 'none')
        window_status = false;
    }






    //////////////////////////
    ////KEYPAD TRIGGER////////////
    /////////////////////////



    function handleKeyDown(evt) {


        switch (evt.key) {


            case 'Enter':
                exec_cmd();
                break;


            case 'ArrowDown':
                nav("+1")
                break;


            case 'ArrowUp':
                nav("-1")
                break;

            case '0':
                show_man();
                break;

            case 'SoftLeft':
                close_man();
                break;


        }

    };



    document.addEventListener('keydown', handleKeyDown);




});