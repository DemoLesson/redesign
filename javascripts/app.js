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
			'unlockCard' : ''
		}

		/**
		 * Handle adding a skill for this user.
		 */
		this.addSkill = function (skill) {
			DemoLesson.hasSkills[DemoLesson.hasSkills.length] = skill;

			DemoLesson.getResponse('addSkill', {'skill-id':skill}, function(){
				alert('success')
			})
		}

		/**
		 * Handle removing a skill from this user.
		 */
		this.removeSkill = function (skill) {

			/**
			 * Remove the skill item from the hasSkills Array.
			 */
			for(i=0;i<DemoLesson.hasSkills.length;i++) {
				if(DemoLesson.hasSkills[i] == skill) {
					DemoLesson.hasSkills.splice(i,1)
					break;
				}
			}

			DemoLesson.getResponse('removeSkill', {'skill-id':skill}, function(){
				alert('success')
			})
		}

		/**
		 * A shortcut for getting the response for a specific action.
		 */
		this.getResponse = function(url, data, callback) {
			$.get(DemoLesson.urls[url], data, callback, 'json');
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