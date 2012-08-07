var DemoLesson;

(function($){  

	/**
	 * Initialize some Foundation Elements we need.
	 */
	$(function(){
		$(document).foundationButtons();
		$(document).foundationCustomForms();		
	});



	/**
	 * Setup the interactions.
	 */
	$(function(){

		/**
		 * Add and remove skills.
		 */
		$(".skill-select .columns span").live('click', function(){
			var item = $(this).parent();
			if(item.hasClass('selected')) {
				DemoLesson.removeSkill(item.data('skill'))
				item.removeClass('selected');
			}
			else {
				DemoLesson.addSkill(item.data('skill'))
				item.addClass('selected');
			}
			return false;
		})

		$(".badge").hover(function(){
			$(".highlight .row > div").hide()

			$("#skill-"+$(this).data('skillgroup')).show()
		},function(){
			$("#skill-"+$(this).data('skillgroup')).hide()
			$("#bio").show();
		})

		/**
		 * Mark selected skills as available.
		 */
		for(i=0;i<DemoLesson.hasSkills.length;i++) {
			$("div[data-skill="+DemoLesson.hasSkills[i]+"]").addClass('selected')
		}	

	});


	/**
	 * The DemoLesson AJAX interaction object.
	 * @author David Boskovic
	 * @since 08/05/2012
	 */
	DemoLesson = new function() {

		/**
		 * This is populated with the user ID once unlockCard has been called or if it's been loaded from the url.
		 */
		this.userID = false;
		this.hasSkills = [];

		/**
		 * Configure this with the specific handlers for each action.
		 */
		this.urls = {
			'addSkill' : '',
			'removeSkill' : '',
			'addEducation' : '',
			'addWorkExperience' : '',
			'addCertification' : '',
			'unlockCard' : '',
			'fetchBadges' : ''
		}

		/**
		 * Handle adding a skill for this user.
		 * @expects {'status':'success|failure'}
		 */
		this.addSkill = function (skill) {

			if(!DemoLesson.userID) alert('DemoLesson.userID must be set.');

			DemoLesson.hasSkills[DemoLesson.hasSkills.length] = skill;

			DemoLesson.getPostResponse('addSkill', {'user-id':DemoLesson.userID,'skill-id':skill}, function(){
				alert('success')
			})
		}

		/**
		 * Handle removing a skill from this user.
		 * @expects {'status':'success|failure'}
		 */
		this.removeSkill = function (skill) {

			if(!DemoLesson.userID) alert('DemoLesson.userID must be set.');

			/**
			 * Remove the skill item from the hasSkills Array.
			 */
			for(i=0;i<DemoLesson.hasSkills.length;i++) {
				if(DemoLesson.hasSkills[i] == skill) {
					DemoLesson.hasSkills.splice(i,1)
					break;
				}
			}

			DemoLesson.getDeleteResponse('removeSkill', {'user-id':DemoLesson.userID,'skill-id':skill}, function(){
				alert('success')
			})
		}



		/**
		 * Handle fetching a badge for this user.
		 * @expects ['badge-category','other-badge-category']
		 */
		this.fetchBadges = function () {

			if(!DemoLesson.userID) alert('DemoLesson.userID must be set.');

			DemoLesson.getResponse('fetchBadges', {'user-id':DemoLesson.userID}, function(){
				alert('success')
			})
		}

		/**
		 * A shortcut for getting the response for a GET action.
		 */
		this.getResponse = function(url, data, callback) {
			$.get(DemoLesson.urls[url], data, callback, 'json');
		}


		/**
		 * A shortcut for getting the response for a POST action.
		 */
		this.getPostResponse = function(url, data, callback) {
			$.post(DemoLesson.urls[url], data, callback, 'json');
		}

		/**
		 * A shortcut for getting the response for a DELETE action.
		 */
		this.getDeleteResponse = function(url, data, callback) {
			$.ajax({
			  url: DemoLesson.urls[url],
			  type:"DELETE",
			  data: data,
			  success: callback,
			  dataType: 'json'
			});
		}
	}
	
})(jQuery);


/**
 * Load any webfonts that we want around.
 */

WebFontConfig = {
	google: { families: [ 'Exo:200:latin' ] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();