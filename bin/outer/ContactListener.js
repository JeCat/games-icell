
yc.outer.ContactListener = function () {};

yc.outer.ContactListener.prototype.BeginContact = function (contact)
{
	var a = contact.GetFixtureA().GetBody().GetUserData() ;
	var b = contact.GetFixtureB().GetBody().GetUserData() ;
	
	if(a && a.constructor.className=='yc.outer.Cell' && b )
	{
		a.collide(b) ;
	}
	else if(b && b.constructor.className=='yc.outer.Cell' && a )
	{
		b.collide(a) ;
	}
}

yc.outer.ContactListener.prototype.EndContact = function (contact) {}

yc.outer.ContactListener.prototype.PreSolve = function (contact, oldManifold) {}

yc.outer.ContactListener.prototype.PostSolve = function (contact, impulse) {}