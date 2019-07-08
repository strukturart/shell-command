
$(document).ready(function() 
 {


	//Global Vars
	var i = 0;
	var z = -1;
	var finderNav_tabindex = -1;


	/////////////////////////
	function finder()
	{


	var finder = new Applait.Finder({ type: "sdcard", debugMode: true });


		finder.on("empty", function (needle) 
		{
		    alert("no sdcard found");
		    return;
		});

		finder.search("cmd.json");



		finder.on("fileFound", function (file, fileinfo, storageName) 
		{

			var reader = new FileReader()


			reader.onerror = function(event) 
					{
						alert('shit happens')
						reader.abort();
					};

					reader.onloadend = function (event) 
					{

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
					$("div#app-list").append('<div class="items" tabindex="'+finderNav_tabindex+'"  data-cmd="'+item.cmd+'">'+item.cmd_name+'</div>');
									
								
	
									

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



	function nav (move) {
	var items = document.querySelectorAll('.items');
		if(move == "+1" && i < finderNav_tabindex)
		{
			i++

			if(i <= finderNav_tabindex)
			{
				var items = document.querySelectorAll('.items');
				var targetElement = items[i];
				targetElement.focus();

			}
		}

		if(move == "-1" &&  i > 0)
		{
			i--
			if(i >= 0)
			{
				var items = document.querySelectorAll('.items');
				var targetElement = items[i];
				targetElement.focus();

			}
		}

	}








//////////////////
//LAUNCH APP
//////////////////

function exec_cmd()
{



	var selected_button = $(":focus")[0];
	var cmd = selected_button.getAttribute('data-cmd');
	cmd = "echo `date +%d-%m-%y`&& "+cmd+" >> /storage/sdcard/cmd/output.txt 2>&1";

	alert(cmd)


	 let extension = navigator.kaiosExtension || navigator.engmodeExtension;
          if(extension)
          {

          	//let executor = extension.startUniversalCommand(output, true);
             let executor = extension.startUniversalCommand(cmd, true); 
             executor.onsuccess = function(e){alert('success')};
             executor.onerror = function(e){alert('command failed')};
          }
          else alert('no extension object available');



}



function show_man()
{
	$("div#man-page").css('display','block')
	window_status = true;
}

function close_man()
{
	$("div#man-page").css('display','none')
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


	//////////////////////////
	////BUG OUTPUT////////////
	/////////////////////////


	$(window).on("error", function(evt) {

	console.log("jQuery error event:", evt);
	var e = evt.originalEvent; // get the javascript event
	console.log("original event:", e);
	if (e.message) { 
	    alert("Error:\n\t" + e.message + "\nLine:\n\t" + e.lineno + "\nFile:\n\t" + e.filename);
	} else {
	    alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
	}
	});


});






