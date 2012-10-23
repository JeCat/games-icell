// 基因定义



// 定义基因
yc.dna.genes = {

	// 建筑
	'tower(shooter)': new yc.dna.Gene({
		name: 'tower(shooter)'
		, title: '[解锁]防御塔(射击)'
		, description: '解锁：允许建造防御塔(射击)'
	})
	, 'tower(cannon)': new yc.dna.Gene({
		name: 'tower(cannon)'
		, title: '[解锁]防御塔(火炮)'
		, description: '解锁：允许建造防御塔(火炮)'
	})
	, 'tower(slower)': new yc.dna.Gene({
		name: 'tower(slower)'
		, title: '[解锁]防御塔(减速)'
		, description: '解锁：允许建造防御塔(减速)'
	})
	, 'recycle': new yc.dna.Gene({
		name: 'recycle'
		, title: '[解锁]回收站'
		, description: '解锁：允许建造回收站'
	})
	
	, 'grow': new yc.dna.Gene({
		name: 'grow'
		, title: '[解锁]生长'
		, description: '解锁：允许细胞扩充新的格子'
	})
	
	// 器官
	, 'eye': new yc.dna.Gene({
		name: 'eye'
		, title: '[解锁]眼睛'
		, description: '解锁：允许建造眼睛'
	})

	// 升级
	, 'tower:firepower': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:firepower'
		, title: '[升级]防御塔：火力'
		, description: '解锁：能够将“防御塔：火力”升级到更高等级'
		, upgrader: yc.inner.building.up.TowerFierpower
	})
	, 'tower:bombing': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:bombing'
		, title: '[升级]防御塔：轰炸'
		, description: '解锁：能够将“防御塔：轰炸”升级到更高等级'
		, upgrader: yc.inner.building.up.TowerBombing
	})
	, 'tower:retardment': new yc.dna.GeneBuildingUpgrader({
		name: 'tower:retardment'
		, title: '[升级]防御塔：减速'
		, description: '解锁：能够将“防御塔：减速”效果升级到更高等级'
		, upgrader: yc.inner.building.up.TowerRetardment
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




