export default class NavigationUtil {
    /**
     * 跳转到指定页面
     * @param  param 要传递的参数
     * @param page 要跳转的页面
     * **/
    static goPage(params, page) {
        // 在BottomTabBar页面接受navigation
        const navigation = NavigationUtil.navigation
        if (!navigation) {
            console.log("NavigationUtil.navigation can not be null")
            return;
        }
        navigation.navigate(
            page,
            {
                ...params
            }
        )
    }
    /**
     * 重置到某一页
     */
    static resetToPage(params, page) {
        const navigation = NavigationUtil.navigation
        // console.log("luyou",navigation)
        // if(!navigation){
        //     console.log("NavigationUtil.navigation can not be null")
        //     return;
        // }
        // console.log('你啊后')
        navigation.replace(
            page,
            {
                ...params
            }
        )
    }
    /**
     * 返回上一页
     * @param navigation
     * * */
    static goBack(navigation) {

        navigation.goBack()
    }

    /**
     * 重置到首页
     */
    static resetToHomePage(params) {
        const { navigation } = params;
        navigation.navigate("Main")
    }
}