
yc.outer.ContactListener = function () {};

yc.outer.ContactListener.prototype.BeginContact = function (contact)
{
	var A = contact.GetFixtureA() ;
	var B = contact.GetFixtureB() ;
	var a = A.GetBody().GetUserData() ;
	var b = B.GetBody().GetUserData() ;
	
	if(a && a.constructor.className=='yc.outer.Cell' && b )
	{
		a.collide(b,A,B) ;
	}
	else if(b && b.constructor.className=='yc.outer.Cell' && a )
	{
		b.collide(a,B,A) ;
	}
}

yc.outer.ContactListener.prototype.EndContact = function (contact) {}

yc.outer.ContactListener.prototype.PreSolve = function (contact, oldManifold) {}

yc.outer.ContactListener.prototype.PostSolve = function (contact, impulse) {}