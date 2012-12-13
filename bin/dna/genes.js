// 基因定义



// 定义基因
yc.dna.genes = {

	// 建筑
	'tower(shooter)': new yc.dna.Gene({
		name: 'tower(shooter)'
		, title: '[解锁]防御塔(射击)'
		, description: '解锁：允许建造防御塔(射击)'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [37,2,33,33]
			, grayRect: [2,212,33,33]
		}
	})
	,'tower(cannon)': new yc.dna.Gene({
		name: 'tower(cannon)'
		, title: '[解锁]防御塔(火炮)'
		, description: '解锁：允许建造防御塔(火炮)'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [212,37,33,33]
			, grayRect: [177,37,33,33]
		}
	})
	, 'tower(slower)': new yc.dna.Gene({
		name: 'tower(slower)'
		, title: '[解锁]防御塔(减速)'
		, description: '解锁：允许建造防御塔(减速)'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [2,107,33,33]
			, grayRect: [2,72,33,33]
		}
	})
	, 'recycle': new yc.dna.Gene({
		name: 'recycle'
		, title: '[解锁]回收站'
		, description: '解锁：允许建造回收站'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [177,2,32,33]
			, grayRect: [142,2,33,33]
		}
	})
	
	, 'grow': new yc.dna.Gene({
		name: 'grow'
		, title: '[解锁]生长'
		, description: '解锁：允许细胞扩充新的格子'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [37,177,32,33]
			, grayRect: [37,142,33,33]
		}
	})
	, 'rocket': new yc.dna.Gene({
		name: 'rocket'
		, title: '[解锁]火箭推进器'
		, description: '解锁：短时间内让细胞的移动速度加倍'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [107,2,32,33]
			, grayRect: [72,2,33,33]
		}
	})
	, 'power': new yc.dna.Gene({
		name: 'power'
		, title: '[解锁]线粒体：动力'
		, description: '解锁：增加细胞的移动速度'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [37,37,32,33]
			, grayRect: [212,2,33,33]
		}
	})
	
	// 器官
	, 'eye': new yc.dna.Gene({
		name: 'eye'
		, title: '[解锁]眼睛'
		, description: '解锁：允许建造眼睛'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [72,37,32,33]
			, grayRect: [37,212,33,33]
		}
	})
	, 'oshooter': new yc.dna.Gene({
		name: 'oshooter'
		, title: '[解锁]导弹'
		, description: '解锁：攻击细胞外部的病毒群'
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [37,107,33,33]
			, grayRect: [37,72,33,33]
		}
	})
	, 'bottles': new yc.dna.Gene({
		name: 'bottles'
		, title: '[解锁]漂流瓶'
		, description: '解锁：朋友无处不在'
		, icon: {
			file: "res/guanka.png"
			, rect: [72,107,33,33]
			, grayRect: [72,72,33,33]
		}
	})

	// 升级
	, 'tower:firepower': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:firepower'
		, title: '[升级]防御塔：火力'
		, description: '解锁：能够将“防御塔：火力”升级到更高等级'
		, upgrader: yc.inner.building.up.TowerFierpower
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [2,177,32,33]
			, grayRect: [2,142,33,33]
		}
	})
	, 'tower:bombing': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:bombing'
		, title: '[升级]防御塔：轰炸'
		, description: '解锁：能够将“防御塔：轰炸”升级到更高等级'
		, upgrader: yc.inner.building.up.TowerBombing
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [142,37,32,33]
			, grayRect: [107,37,33,33]
		}
	})
	, 'tower:retardment': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:retardment'
		, title: '[升级]防御塔：减速'
		, description: '解锁：能够将“防御塔：减速”效果升级到更高等级'
		, upgrader: yc.inner.building.up.TowerRetardment
		, icon: {
			file: "res/dna-icons-32.png"
			, rect: [2,37,32,33]
			, grayRect: [2,2,33,33]
		}
	})
	// , 'effct': new yc.dna.Gene({
	// 	name: 'effct'
	// 	, title: '效率'
	// 	, description: '解锁：提高回收站线粒体的移动速度'
	// 	//, upgrader: yc.inner.building.up.RecycleSpeed
	// })
	// , 'team': new yc.dna.Gene({
	// 	name: 'team'
	// 	, title: '团队'
	// 	, description: '解锁：增加回收站线粒体的数量'
	// 	, upgrader: yc.inner.building.up.RecycleNumber
	// })
}




