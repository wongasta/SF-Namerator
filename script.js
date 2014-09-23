var userREGEX = /([a-z_0-9]{2,4})[|]([a-z_0-9]{2,4})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([^|\s]{1,25})[|]([^|]{1,25})[^|\s]/;

$(document).ready(function(){

	//XML Rendering, sourcing from ETL Job
	var i=0; //First loop counter
	var ii=0; //Second loop counter
	var iii=0; //Third loop counter
	var unselectedOption='<option value="unselected" selected="selected" class="removeOption"> </option>';
	
	$.get('output_final.xml', function(d) {
				
	 		/* BEGINS XML OUTPUT 1 */
			//console.log('XML Opened');
			$('#sel2 .formBox .dynContainer').append('<select name="selForm3" id="selForm3" class="selectionForm"> </select>');
			$('#sel2 .formBox .dynContainer select').append(unselectedOption);
			$(d).find('BU').each(function(){
				//console.log(i);
				i++;
				$BU=$(this);
				$('#sel2 .formBox .dynContainer select').append('<option value="' + $BU.attr('BU_CD').toLowerCase() + '">' + $BU.attr('BU_DC') + '</option>');
				/* BEGINS XML OUTPUT 2*/
				
				$('#sel3 .formBox .dynContainer').append('<select name="selForm4-'+ i +'" id="selForm4-'+ i +'" class="selectionForm '+ $BU.attr('BU_CD').toLowerCase() + 'Option"></select>');
				$('#sel3 .formBox .dynContainer #selForm4-'+ i).append(unselectedOption);
				
				$BU.find('PLOB').each(function(){
					ii++;
					$PLOB=$(this);
					//console.log($PLOB.attr('PLOB_CD') + ' - ' + i);
					$('#sel3 .formBox .dynContainer #selForm4-'+ i).append('<option value="' + $PLOB.attr('PLOB_CD').toLowerCase() + '">' + $PLOB.attr('PLOB_DC') + '</option>');
					
					/* BEGINS XML OUTPUT 3*/
					
					$('#sel4 .formBox .dynContainer').append('<select name="selForm5-'+ i + '-' + ii +'" id="selForm5-'+ i + '-' + ii +'" class="selectionForm '+ $BU.attr('BU_CD').toLowerCase() + $PLOB.attr('PLOB_CD').toLowerCase() + 'Option"></select>');
					$('#sel4 .formBox .dynContainer #selForm5-'+ i + '-' +ii).append(unselectedOption);
					
					$PLOB.find('PO').each(function(){
						iii++;
						$PO=$(this);
						//console.log('#sel4 .formBox #selForm5-'+ i + '-' + ii);
						//console.log($PO.attr('PO_CD') + '-' + $PO.attr('PO_DC'));
						$('#sel4 .formBox .dynContainer #selForm5-'+ i + '-' + ii).append('<option value="' + $PO.attr('PO_CD').toLowerCase() + '">' + $PO.attr('PO_DC') + '</option>');
						
						/* BEGINS XML OUTPUT 4*/
						
						$('#sel5 .formBox .dynContainer').append('<select name="selForm6-'+ i + '-' + ii + '-' + iii +'" id="selForm6-'+ i + '-' + ii + '-' + iii +'" class="selectionForm '+ $BU.attr('BU_CD').toLowerCase() + $PLOB.attr('PLOB_CD').toLowerCase() + $PO.attr('PO_CD').toLowerCase() + 'Option"></select>');
						$('#sel5 .formBox .dynContainer #selForm6-'+ i + '-' + ii + '-' + iii).append(unselectedOption);
						
						$PO.find('PQ').each(function(){
							$PQ=$(this);
							$('#sel5 .formBox .dynContainer #selForm6-'+ i + '-' + ii + '-' + iii).append('<option value="' + $PQ.attr('PQ_CD').toLowerCase() + '">' + $PQ.attr('PQ_DC') + '</option>');
						});
						
						/* END XML OUTPUT 4*/
						
					});
					
					/* END XML OUTPUT 3*/
					
				});
				
				
				/* END XML OUTPUT 2 */
			});
			/* END XML OUTPUT 1 */
			
	$('#formMain').val("Let's Get Started!");
	
	var currentIndex = 0;
	var Selection1, Selection2, Selection3, Selection4 = '';
	var valArray = new Array;
	
	function insertAcro(){
		$('.formBox select option').each(function() {
			if ($(this).val()!='unselected'){
			$(this).append(' (' + $(this).val() + ')');
			}
		});
	}
	
	insertAcro();
	
		//Calculate all the names on top, etc
	function nameTop(){
		for (i=0; i<=5; i++){
			valArray[i]='n_a';
		}
		
		//Put in the first two static fields
		valArray[0]=$('#sel0 .selectionForm').val();
		if ($('#sel1 .selectionForm').val() != null){
			valArray[1]=$('#sel1 .selectionForm').val();
		}else{
			valArray[1]='n_a';
		}
		
		//Go through the next 4 fields
		if ($('#sel2 .dynContainer .selectionForm').val() != null){
			valArray[2]=$('#sel2 .dynContainer .selectionForm').val();
		}else{
			valArray[2]='n_a';
		}
		if ($('#sel3 .' + Selection1 + 'Option').val() != null){
			valArray[3]=$('#sel3 .' + Selection1 + 'Option').val();
		}else{
			valArray[3]='n_a';
		}
		if ($('#sel4 .' + Selection1 + Selection2 + 'Option').val() != null){
			valArray[4]=$('#sel4 .' + Selection1 + Selection2 + 'Option').val();
		}else{
			valArray[4]='n_a';
		}
		if ($('#sel5 .' + Selection1 + Selection2 + Selection3 + 'Option').val() != null){
			valArray[5]=$('#sel5 .' + Selection1 + Selection2 + Selection3 + 'Option').val();
		}else{
			valArray[5]='n_a';
		}
		
		var arrayPH;
		
		//Trim and replace space with _ for the last two text fields
		if ($.trim($('#sel6 .selectionInput').val()) == ''){
			valArray[6]='n_a';
		}else{
			arrayPH=$('#sel6 .selectionInput').val().replace(/ /g, '_').toLowerCase();
			valArray[6]=arrayPH.replace(/\|/g, '_').substring(0,3);
		}
		if ($.trim($('#sel7 .selectionInput').val()) == ''){
			valArray[7]='n_a';
		}else{
			arrayPH=$('#sel7 .selectionInput').val().replace(/ /g, '_').toLowerCase();
			valArray[7]=arrayPH.replace(/\|/g, '_').substring(0,25);
		}
		
		for(var z=0; z<valArray.length; z++){
			if (valArray[z]=='unselected'){
				valArray[z]='n_a';
			}
		}
		
		$('#formMain').val(valArray[0]+'|'+valArray[1]+'|'+valArray[2]+'|'+valArray[3]+'|'+valArray[4]+'|'+valArray[5]+'|'+valArray[6]+'|'+valArray[7]);
	}
	
	//Clear all the dropdown list to default blank
	function clearAllDrop(){
		$('.selectionForm').val('xxx');
	};
	
	function clearAllText(){
		$('.selectionInput').val('');
	}
	
	//Hide all the layered colorful divs 
	function clearAll(){
		$('#bodyContainer .selection').hide();
		$('#bodyContainer .selection:first-child').show();
		$('#bodyContainer .selection:first-child .selectionDiv').addClass('sdBot');
	};
	
	//Loop through the list of items that need to be hidden, whenever a user selects a different value on high up drop down
	function hideSelect(i){
		for (i; i<4; i++){
			$('#sel'+(i+2)+' .selectionForm').hide().val('unselected');
		}
	};
	
	//Display the next block
	function displayNext(nextIndex){
		$('#sel' + nextIndex).fadeIn(500);
		$('#sel' + nextIndex + ' .selectionDiv').addClass('sdBot');
	}
	
	//Clear all the colorful divs, texts, and drop down to default
	clearAll();
	clearAllDrop();
	clearAllText();
	
	//Whenever a user change a form, the var below is for user to click 2 times ONLY before activiating the event
	$('.selectionInput').keyup(function(){
		nameTop();
	});
	
	$('.selectionForm').click(function(){
	
		if(1==0/*$(this).attr('id')=='selForm2' && ($('#selForm2').val()=='ent' || $('#selForm2').val()=='adv' || $('#selForm2').val()=='int')*/){
			currentIndex=7;
			$('#sel2, #sel3, #sel4, #sel5, #sel6, #sel7').show();
			$('.entOptionSP').show();
			$('.entOptionSP option').prop('selected', true);
			//console.log('ent activated');
		}else if($(this).attr('id')=='selForm2'){
			
			if (currentIndex==7){
				currentIndex=1;
				$('#sel2, #sel3, #sel4, #sel5, #sel6, #sel7').hide();
				$('.entOptionSP').hide();
				$('#sel1 .selectionForm').removeClass('inactive');
				$('#sel2 .selectionForm').removeClass('inactive');
				$('#sel3 .selectionForm').removeClass('inactive');
				$('#sel4 .selectionForm').removeClass('inactive');
				$('#sel5 .selectionForm').removeClass('inactive');
				$('.dynContainer .selectionForm').val('unselected');
			}
			
		}else{
			if($('#selForm2').val()!='ent'){
				
			}
		}
		
		if(currentIndex!=7){
			//console.log('select');
			//go down list and push out once user clicks a list
			if ($(this).hasClass('inactive').toString()=='false'){
				currentIndex++;
				displayNext(currentIndex);
				$(this).parent().children('.selectionForm').addClass('inactive');
			}
			if (currentIndex>=3 && $(this).is('#sel2 .selectionForm')){
				hideSelect(1);
				Selection1 = $(this).val();
				$('#sel3 .' + Selection1 + 'Option').show();
			}else if (currentIndex>=4 && $(this).is('#sel3 .selectionForm')){
				hideSelect(2);
				Selection2 = $(this).val();
				$('#sel4 .' + Selection1 + Selection2 + 'Option').show();
			}else if (currentIndex>=5 && $(this).is('#sel4 .selectionForm')){
				hideSelect(3);
				Selection3 = $(this).val();
				$('#sel5 .' + Selection1 + Selection2 + Selection3 + 'Option').show();
			}else if (currentIndex>=6 && $(this).is('#sel5 .selectionForm')){
				Selection4 = $(this).val();
			}
			if(currentIndex>6){
				currentIndex=6;
			}
		}
		//activates all the changes on top
		nameTop();
		clicknum = 0;
		
		//console.log(currentIndex);
	});
	
	//Change to input at bottom
	$('.selectionInput').focus(function(){
		if(currentIndex>=6 && $(this).is('#sel6 .selectionInput')){
			$('#sel6, #sel7').fadeIn(500);
			$('#sel6 .selectionInput').show();
			$('#sel7 .selectionInput').show();
			$(this).parent().children('.selectionInput').addClass('inactive');
		}
	});
	
	//Starts the Reverse Search Engine Functions
	
	var userArray;
	var userArrayResponse;
	var useri;
	var user;
	
	function selVal1(){
		//Push in the 1st value
		$('#selForm1 > option').each(function(){
			if (userArray[0]==this.value){
				userArrayResponse[0] = this.text;
				//console.log(userArrayResponse[0]);
			}
		});
	}
	
	function selVal2(){
		//Push in the 2nd value
		$('#selForm2 > option').each(function(){
			if (userArray[1]==this.value){
				userArrayResponse[1] = this.text;
				//console.log(userArrayResponse[1]);
			}
		});
	}
	
	function selVal36(){
		//This function selects the value for 3-6 thorugh looping the xml
		$(d).find('BU').each(function(){
			$BU=$(this);
			//console.log($BU.attr('BU_CD'));
			if (userArray[2]==$BU.attr('BU_CD').toLowerCase()){
				userArrayResponse[2] = $BU.attr('BU_DC');
				//console.log(userArrayResponse[2]);
			}
			
			$BU.find('PLOB').each(function(){
				$PLOB=$(this);
				if (userArray[3]==$PLOB.attr('PLOB_CD').toLowerCase()){
					userArrayResponse[3] = $PLOB.attr('PLOB_DC');
					//console.log(userArrayResponse[3]);
				}
				
				$PLOB.find('PO').each(function(){
					$PO=$(this);
					if (userArray[4]==$PO.attr('PO_CD').toLowerCase()){
						userArrayResponse[4] = $PO.attr('PO_DC');
						//console.log(userArrayResponse[4]);
					}
					
					$PO.find('PQ').each(function(){
						$PQ=$(this);
						if (userArray[5]==$PQ.attr('PQ_CD').toLowerCase()){
							userArrayResponse[5] = $PQ.attr('PQ_DC');
							//console.log(userArrayResponse[5]);
						}
					});
				});
				
			});
		});
	}
	
	function selVal7(){
		//Simply trasnfer the value from two arrays
		userArrayResponse[6] = userArray[6];
	}
	
	function displayVal(){
		//Loops through array and display on the output panel
		for(var y=0; y<8; y++){
			//console.log(userArrayResponse[y]);
			if (y>1 && y<6){
				$('.outputR' + y).html(userArrayResponse[y] + ' (' + userArray[y] + ')');
			}else{
				$('.outputR' + y).html(userArrayResponse[y]);
			}
		}
	}
	
	//Mouse click event for the Go! button
	$('.buttonR').click(function(e){
		//Needed to prevent default action of links
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		user = $('.formR input').val();
		//console.log(user);
		
		//reset the arrays and var
		userArray = [];
		useri = 0;
		userArrayResponse = [];
		
		//set everything default to n_a
		for(var x=0; x<8; x++){
			userArray[x]='n_a';
			userArrayResponse[x]='Unknown';
		}
		
		//check regex, declared at the top of the doc
		if (userREGEX.test(user)){
			$.each(user.split("|"), function(index, item) {
				//console.log(item); 
				userArray[useri]=item;
				useri++;
			});
			//For some retarded reason you have to specifically pop() the last value after delimiter
			userArray[7]=user.split("|").pop();
			userArrayResponse[7]=user.split("|").pop();
			
			//Double check to make sure array length is 0-7
			if (userArray.length=7){
				
				//calls through all the functions to get values
				selVal1();
				selVal2();
				selVal36();
				selVal7();
				displayVal();
				
			}else{
				errorDisplay('Error 102: Input not valid length. Needs to be in: xxx|xxx|xxx|xxx|xxx|xxx|(anything except | and whitespace)|(anything except | and whitespace)');
			}
		}else{
			errorDisplay('Error 101: Input not valid. Needs to be in: xxx|xxx|xxx|xxx|xxx|xxx|(anything except | and whitespace)|(anything except | and whitespace)');
		}
	});
	
	//Function to display error on the error portion of the page
	function errorDisplay(error){
		$('.hintR').addClass('error').html(error);
	}
			
	}, "xml");
	
	
	//toggles (hide/show) everything when reverse search is clicked
	$('.toggleLink').click(function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$('.toggleN').slideToggle();
		$('.toggleR').slideToggle();
		$('.formN').toggle();
		$('.formR').toggle();
		$('.hintN').toggle();
		$('.hintR').toggle();
		$('.toggleImgN').toggle();
		$('.toggleImgR').toggle();
	});
	
	//sets the reverse search input then clear it once user clicks on it
	$('#formMainR').val("Paste in the value here and click go!");
	
	$('#formMainR').click(function(){
		if($(this).val()=='Paste in the value here and click go!'){
			$(this).val('');
		}
	});
	
});