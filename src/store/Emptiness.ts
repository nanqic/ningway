import { ChatVideo, EmptinessTheme } from "@/utils/types";

/**
 * 慧普师兄带的12期空性主题
 */
export const hp_themes: Array<EmptinessTheme>[] = [
    [
        {
            title: "《佛是什么》",
            amount: 10,
            totalTime: 3.3,
            detail: 'foshism'
        },
        {
            title: "《为什么学佛》",
            amount: 8,
            totalTime: 3.3,
            detail: 'whyxuefo'
        }
    ],
    [{
        title: "《明师的特征》",
        amount: 10,
        totalTime: 2.4,
        detail: 'mingshi_tezheng'
    },
    {
        title: "★《明师的作用》",
        amount: 8,
        totalTime: 2.3,
        detail: 'mingshi_zuoyong'
    },
    {
        title: "★《如何依止明师受益》",
        amount: 8,
        totalTime: 2.6,
        detail: 'yizhi_mingshi'
    }],
    [{
        title: "正知见系列一·见地的重要性",
        amount: 19,
        totalTime: 7,
        detail: 'zhengzhijian1'
    }],
    [{
        title: "正知见系列二·第一义谛 & 最高知见",
        amount: 16,
        totalTime: 6.5,
        detail: 'zhengzhijian2'
    }],
    [{
        title: "正知见系列三·缘起性空 & 中道",
        amount: 10,
        totalTime: 4.4,
        detail: 'zhengzhijian3'
    }],
    [{
        title: "法门",
        amount: 19,
        totalTime: 5,
        detail: 'famen'
    },
    {
        title: "法门",
        amount: 9,
        totalTime: 2.3,
        detail: 'famen2'
    }],
    [{
        title: "觉而不动&不定义",
        amount: 19,
        totalTime: 5.8,
        detail: 'budingyi'
    },
    {
        title: "觉而不动&不定义",
        amount: 7,
        totalTime: 2.3,
        detail: 'budingyi2'
    }],
    [{
        title: "发愿·目标",
        amount: 17,
        totalTime: 4.6,
        detail: 'fayuan_mubiao'
    }],
    [{
        title: "即心即佛 - 出离心·菩提心",
        amount: 24,
        totalTime: 5.8,
        detail: 'jifo'
    },
    {
        title: "即心即佛 - 出离心·菩提心",
        amount: 9,
        totalTime: 1.8,
        detail: 'jifo2'
    }],
    [{
        title: "行善·积功德",
        amount: 19,
        totalTime: 6,
        detail: 'xingshan'
    }],
    [{
        title: "断恶·改习气",
        amount: 18,
        totalTime: 5.6,
        detail: 'duan_e_gaixiqi'
    },
    {
        title: "行善·积功德",
        amount: 9,
        totalTime: 3,
        detail: 'xingshan'
    }],
    [{
        title: "尽心淫",
        amount: 18,
        totalTime: 6.2,
        detail: 'jinxinyin2'
    }, {
        title: "尽心淫",
        amount: 7,
        totalTime: 2.8,
        detail: 'jinxinyin'
    }]
]

// 以下为主题列表详情
export const themeDetails = new Map<string, ChatVideo[]>([
    ["foshism", [
        { id: 1, title: "《空性里边不染一法》", no: 23142 },
        { id: 2, title: "《始终要安住在第一义谛来修证FO法》", no: 51373 },
        { id: 3, title: "《我们不了解FO是什么》", no: 50967 },
        { id: 4, title: "《让你通过经典认识到FO是什么 》", no: 25242 },
        { id: 5, title: "《FO是什么》", no: 31561 },
        { id: 6, title: "《了解自己就了解一切》", no: 21976 },
        { id: 7, title: "《不知道FO是什么》", no: 21779 },
        { id: 8, title: "《因为你不了解FO是什么》", no: 50322 },
        { id: 9, title: "《FO是看到生命实相的人》", no: 40340 },
        { id: 10, title: "《从概念先出离 》", no: 23725 }
    ]],
    ["whyxuefo", [
        { id: 1, title: "《回归本源》", no: 31317 },
        { id: 2, title: "《生命本来的样子 》", no: 31007 },
        { id: 3, title: "《为什么我们要成FO》", no: 50254 },
        { id: 4, title: "《释迦牟尼是最好的老师》", no: 21720 },
        { id: 5, title: "《你的生命是没有方向的》", no: 51438 },
        { id: 6, title: "《你要活成爱本身》", no: 23088 },
        { id: 7, title: "《我们是学习FO陀的智慧》", no: 31524 },
        { id: 8, title: "《你看不到十维》", no: 10363 }
    ]],
    ["zhengzhijian2", [{ id: 1, title: "《法华经》第一义谛说", no: "51523" },
    { id: 2, title: "过去心不可得未来心不可得", no: "24022" },
    { id: 3, title: "百日谈 18年8月27日 （五）", no: "50080" },
    { id: 4, title: "你去看一看释迦摩尼佛在说什么", no: "23532" },
    { id: 5, title: "空性的第一义谛一定要很熟练地了解", no: "50834" },
    { id: 6, title: "大道至简", no: "25580" },
    { id: 7, title: "见地上安住第一义谛不动", no: "50899" },
    { id: 8, title: "佛子的富贵", no: "40659" },
    { id: 9, title: "最高知见在这", no: "24033" },
    { id: 10, title: "如果没有佛陀的知见", no: "20239" },
    { id: 11, title: "当下的知见决定你在轮转", no: "50673" },
    { id: 12, title: "你需要的是见地", no: "50542" },
    { id: 13, title: "只是你无法安住在空性里", no: "20294" },
    { id: 14, title: "法身本来定", no: "22824" },
    { id: 15, title: "往前走", no: "22828" },
    { id: 16, title: "修行是个很平凡的事情", no: "22820" },]],
    /**
     * 发源·目标
     */
    ["fayuan_mubiao", [
        { id: 1, title: "释迦摩尼佛是我的偶像", no: "20707" },
        { id: 2, title: "是日已过 如鱼少水", no: "10701" },
        { id: 3, title: "你必须了知生命的实相", no: "50377" },
        { id: 4, title: "你发大愿的时候 就不会安住小乐", no: "50285" },
        { id: 5, title: "以中为度", no: "25258" },
        { id: 6, title: "佛菩萨的愿力", no: "25382" },
        { id: 7, title: "要发愿", no: "23857" },
        { id: 8, title: "所有的障碍来自于自我的认知", no: "23479" },
        { id: 9, title: "从发愿开始", no: "51112" },
        { id: 10, title: "话发心", no: "22216" },
        { id: 11, title: "种子要自己发芽", no: "10664" },
        { id: 12, title: "世间法", no: "32346" },
        { id: 13, title: "发心的重要性", no: "25368" },
        { id: 14, title: "你要先做成菩萨 你就活得不空虚", no: "23607" },
        { id: 15, title: "要结善缘", no: "25466" },
        { id: 16, title: "破种种相", no: "30537" },
        { id: 17, title: "无所说", no: "32064" }]],
    /**
     * 《明师的特征》 主题推荐视频10个
     */
    ["mingshi_tezheng", [
        { id: 1, title: "怎样选择明师", no: "E0036" },
        { id: 2, title: "佛学的老师", no: "31574" },
        { id: 3, title: "他没有事让你做", no: "10617" },
        { id: 4, title: "老师的慈悲", no: "20703" },
        { id: 5, title: "老师做的最重要的事", no: "32307" },
        { id: 6, title: "选择老师", no: "20601" },
        { id: 7, title: "不同阶段会遇到不同的老师", no: "31315" },
        { id: 8, title: "老师也在圆满的过程中", no: "40188" },
        { id: 9, title: "老师做的最重要的事", no: "32307" },
        { id: 10, title: "修证", no: "32255" }]],
    /**
     * 《明师的作用》 主题推荐视频8个
     */
    ["mingshi_zuoyong", [{ id: 1, title: "向导而已", no: "21353" },
    { id: 2, title: "你会遇到明师的", no: "23200" },
    { id: 3, title: "了知第一义谛　从心的无分别开始", no: "23537" },
    { id: 4, title: "老师做的最重要的事", no: "32307" },
    { id: 5, title: "去承担", no: "32404" },
    { id: 6, title: "作为一个老师", no: "21731" },
    { id: 7, title: "佛学老师是破你执着的", no: "23426" },
    { id: 8, title: "没有一个老师可以让你成道", no: "30995" }]],
    /**
     * 《如何依止明师受益》 主题推荐视频8个
     */
    ["yizhi_mingshi", [
        { id: 1, title: "每个老师有自己的发心", no: "50818" },
        { id: 2, title: "寻找你最终心的归宿", no: "10224" },
        { id: 3, title: "佛学老师是破你执着的", no: "23426" },
        { id: 4, title: "佛学的老师", no: "31574" },
        { id: 5, title: "一个成道的上师是无相的 ", no: "23056" },
        { id: 6, title: "他没有事让你做", no: "10617" },
        { id: 7, title: "老师的东西印过来", no: "00035" },
        { id: 8, title: "你会遇到明师的", no: "23200" }]],
    /**
     * 尽淫心
     */
    ["jinxinyin", [
        { id: 1, title: "末法众生修证的利弊", no: 23860 },
        { id: 2, title: "闲话定态", no: 50108 },
        { id: 3, title: "如何断情欲 ", no: 50907 },
        { id: 4, title: "父精母血，情欲是个法相", no: 50647 },
        { id: 5, title: "一个修行者是怎么在爱情里解脱的", no: 51165 },
        { id: 6, title: "通过定态来看你的生命", no: 50469 },
        { id: 7, title: "破觉受", no: 30062 }
    ]],
    /**
     * 不定义
     */
    ["budingyi2", [
        { id: 1, title: "水月光中又一场", no: 20937 },
        {
            id: 2,
            title: "当你看清这个世界，包括你的六根是个假相的时候",
            no: 25491
        },
        { id: 3, title: "心要安住", no: 31694 },
        { id: 4, title: "当你头脑不定义的时候", no: 30145 },
        { id: 5, title: "不着所有的相就是中道", no: 30102 },
        { id: 6, title: "用不分别不执着的心看世界", no: 10191 },
        { id: 7, title: "入定就是人类停下二元对立的认知 ", no: 23356 }
    ]],
    /**
     * 即心即佛
     */
    ["jifo2", [
        { id: 1, title: "所有的缘起都是空性的示现", no: 25406 },
        { id: 2, title: "如何安心 ", no: 31590 },
        { id: 3, title: "当他开始思考生命的意义的时候", no: 21763 },
        { id: 4, title: "梦里同行", no: 21765 },
        { id: 5, title: "珍惜吧", no: 30830 },
        { id: 6, title: "心安住在什么地方很重要", no: 21730 },
        { id: 7, title: "行者的生活方式", no: 21464 },
        { id: 8, title: "当你想觉醒的时候", no: 22710 },
        { id: 9, title: "教外别传", no: 40215 }
    ]],
    /**
     * 正知见1
     */
    ["zhengzhijian1", [
        { id: 1, title: "法华经》讲义（一）", no: "A1001" },
        { id: 2, title: "戒定慧》", no: 21698 },
        { id: 3, title: "莫将易得等闲看》", no: 40422 },
        { id: 4, title: "心外求法》", no: 30884 },
        { id: 5, title: "去了解佛陀在说什么 信受奉行》", no: 51205 },
        { id: 6, title: "觉而不动是个起点》", no: 31279 },
        { id: 7, title: "沧海一粟》", no: 10556 },
        { id: 8, title: "佛眼看六道》", no: 23694 },
        { id: 9, title: "见地》", no: 30885 },
        { id: 10, title: "女相》", no: 50014 },
        { id: 11, title: "当你如如不动的时候》", no: 50847 },
        { id: 12, title: "学佛就学佛的品质》", no: 22996 },
        { id: 13, title: "闲话顶轮》", no: 40298 },
        { id: 14, title: "哪个是你目前的状态》", no: 20274 },
        { id: 15, title: "空性是一切但离一切相》", no: 21956 },
        { id: 16, title: "闲话开悟》", no: 30854 },
        { id: 17, title: "有缘值遇佛陀的智慧》", no: 22057 },
        { id: 18, title: "有没有人可以从生老病死里逃脱》", no: 50827 },
        { id: 19, title: "你所有的事情都在了缘》", no: 20147 }
    ]],
    /**
     * 正知见3
     */
    ["zhengzhijian3", [
        { id: 1, title: "前言：学习佛法要知道什么？", no: "E0002" },
        { id: 2, title: "始终知道佛的正知见是什么", no: 25388 },
        { id: 3, title: "你的心理是没有年龄的", no: 23564 },
        { id: 4, title: "中道行 ", no: 10601 },
        { id: 5, title: "心要安住一个状态 ", no: 30403 },
        { id: 6, title: "生命是要看清楚的", no: 10588 },
        { id: 7, title: "佛说一切法本无生", no: 50214 },
        { id: 8, title: "如如不动就体现在你不取境", no: 22726 },
        { id: 9, title: "放下自我执着的那个点", no: 50808 },
        { id: 10, title: "当你了知诸相虚妄时", no: 20956 }
    ]],
    /**
     * 法门
     */
    ["famen2", [
        {
            id: 1, title: "什么叫法门 ", no: 51100
        },
        {
            id: 2, title: "法身本定", no: 40622
        },
        {
            id: 3, title: "过去心不可得，未来心不可得 ", no: 24022
        },
        {
            id: 4, title: "本来空", no: 20391
        },
        {
            id: 5, title: "法门是破你分别执着的", no: 50566
        },
        {
            id: 6, title: "你要看他的最高知见，法门只是形式", no: 51088
        },
        {
            id: 7, title: "法门都是成道的工具", no: 20290
        },
        {
            id: 8, title: "闲话特异功能", no: 40362
        },
        {
            id: 9, title: "一定要不断地了解佛的正知见", no: 23534
        },
    ]],
    /**
     * 完整版本法门
     */
    ["famen", [{ id: 1, title: "你要看他的最高知见　法门只是形式", no: "51088" },
    { id: 2, title: "很多人迷失在法门里边了", no: "22865" },
    { id: 3, title: "所有的法门都是让你停下妄想的", no: "51454" },
    { id: 4, title: "法门是破你分别执着的", no: "50566" },
    { id: 5, title: "法身本定", no: "40622" },
    { id: 6, title: "上师相应法", no: "50557" },
    { id: 7, title: "本来空", no: "20391" },
    { id: 8, title: "证入空性从不动开始", no: "20403" },
    { id: 9, title: "耳根圆通最终破的是心的执着跟分别", no: "50392" },
    { id: 10, title: "佛说的苦是轮回之苦", no: "50235" },
    { id: 11, title: "如果你放下你的执着的话", no: "24029" },
    { id: 12, title: "观呼吸自在", no: "30778" },
    { id: 13, title: "法门平等", no: "22055" },
    { id: 14, title: "密码就是呼唤他", no: "50006" },
    { id: 15, title: "持任何一个咒都要带着欢喜心", no: "23493" },
    { id: 16, title: "入禅定要注意的", no: "40582" },
    { id: 17, title: "生活中修证的重点", no: "20241" },
    { id: 18, title: "法门是工具", no: "40071" },
    { id: 19, title: "时空的消失", no: "31066" }]]
    ,
    /**
     * 行善
     */
    ["xingshan", [
        { id: 1, title: "刚开始修行时", no: 22587 },
        { id: 2, title: "功德是什么", no: 50751 },
        { id: 3, title: "需要功德", no: 20227 },
        { id: 4, title: "破我执", no: 40387 },
        { id: 5, title: "空性不说善恶", no: 21281 },
        { id: 6, title: "在空性正见指导下的善行就是菩萨道", no: 22585 },
        { id: 7, title: "菩萨道是离一切相 广行善法", no: 51437 },
        { id: 8, title: "二零零九年佛教史略讲（四）", no: 40663 },
        { id: 9, title: "六度万行", no: 50766 },
        { id: 10, title: "三轮体空", no: 40290 },
        { id: 11, title: "人生鸿福容易享", no: 40424 },
        { id: 12, title: "不要在修行佛法里 变成对名利情的追求", no: 20848 },
        { id: 13, title: "佛学跟世俗法有什么区别", no: 30711 },
        { id: 14, title: "利他之心", no: 20554 },
        { id: 15, title: "自利利他", no: 51579 },
        { id: 16, title: "你六根清净就净化地球", no: 22927 },
        { id: 17, title: "游戏毕竟空", no: 30721 },
        { id: 18, title: "阳光本来在那", no: 10347 },
        { id: 19, title: "百日谈 18年9月10日 （六）", no: 50054 }
    ]],
    /**
     * 断恶_改习气
     */
    ["duan_e_gaixiqi", [
        { id: 1, title: "用空性正见指导你所有的修行", no: "51350" },
        { id: 2, title: "断恶修善 止息妄心", no: "51427" },
        { id: 3, title: "自净其意", no: "50200" },
        { id: 4, title: "自己看自己", no: "20154" },
        { id: 5, title: "如果你的心相中没有习气", no: "50204" },
        { id: 6, title: "形成地狱幻境的十种习气", no: "51121" },
        { id: 7, title: "用空性正见来改", no: "51053" },
        { id: 8, title: "你最应该不屑的是你的习气和欲望", no: "20447" },
        { id: 9, title: "修正定", no: "51612" },
        { id: 10, title: "坦然受报  忏悔", no: "23092" },
        { id: 11, title: "忏悔的目的是为了改正", no: "25480" },
        { id: 12, title: "学佛入门杂谈", no: "32366" },
        { id: 13, title: "修忍辱", no: "20065" },
        { id: 14, title: "止语主要是止心  止妄想", no: "22753" },
        { id: 15, title: "净口业", no: "30477" },
        { id: 16, title: "莲花生于五毒", no: "00017" },
        { id: 17, title: "见不了性的原因是 不改变自己的习气与认知角度", no: "23621" },
        { id: 18, title: "佛陀不是让你放下这个世界的 是你被它绊住了", no: "50704" },
    ]]
])
