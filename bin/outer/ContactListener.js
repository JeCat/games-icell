
yc.outer.ContactListener = function () {};

yc.outer.ContactListener.prototype.BeginContact = function (contact)
{
	//contact.Get
	log(['start contact',contact]) ;
}

yc.outer.ContactListener.prototype.EndContact = function (contact) {}

yc.outer.ContactListener.prototype.PreSolve = function (contact, oldManifold) {}

yc.outer.ContactListener.prototype.PostSolve = function (contact, impulse) {}