'use strict';

var welcomepage = GSModule.create({
	
	render : function() {
		var item = null;
		var index = Math.floor(Math.random() * 7);
		
		switch(index) {
			case 0:
				item = '\
					Get closer than ever to your customers. So close that you tell them what they need well before they realize it themselves.\
					<span style="font-style:italic;">" "- Steve Jobs</span>\
				';
				break;
			case 1:
				item = '\
					The goal as a company is to have customer service that is not just the best but legendary.\
					<span style="font-style:italic;">" "- Sam Walton</span>\
				';
				break;
			case 2:
				item = '\
					Your most unhappy customers are your greatest source of learning.\
					<span style="font-style:italic;">" "- Bill Gates</span>\
				';
				break;
			case 3:
				item = '\
					The customer experience is the next competitive battleground.\
					<span style="font-style:italic;">" "- Jerry Gregoire</span>\
				';
				break;
			case 4:
				item = '\
					He profits most who serves best.\
					<span style="font-style:italic;">" "- Arthur F. Sheldon</span>\
				';
				break;
			case 5:
				item = '\
					Customer service is not a department, it’s everyone’s job.\
					<span style="font-style:italic;">" "- Anonymous</span>\
				';
				break;
			case 6:
				item = '\
					Take your customers to the future.\
					<span style="font-style:italic;">" "- GAUSIAN</span>\
				';
				break;
		}
		
		return ('\
			<div>\
				<div class="__Customer__welcomeTitle">Welcome to Customers</div>\
				<div class="__Customer__welcomeQuote">' + 
					item +
				'</div>\
			</div>\
		');
	}
});
