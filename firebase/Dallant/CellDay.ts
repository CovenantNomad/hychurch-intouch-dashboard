import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../client/firebaseConfig";
import { DALLANTS_COLLCTION } from "../../interface/firebase";
import toast from "react-hot-toast";
import { CreateMenuType, DeleteMenuType, MenuType, RestaurantFormType, RestaurantType, UpdateMenuType } from "../../interface/Dallants";


export const createRestaurants = async ({ restaurantName }: RestaurantFormType) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const restaurantRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS)
        const restaurantDocs = await getDocs(restaurantRef)

        const newRestaurantRef = doc(collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS));
        await setDoc(newRestaurantRef, {
          restaurantId: newRestaurantRef.id,
          restaurantName: restaurantName,
          ordered: String(restaurantDocs.size + 1)
        });

        toast.success(`상점이 생성되었습니다.`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createRestaurants Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const getRestaurants = async () => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        let restaurantList: RestaurantType[] = []

        const restaurantRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS);
        const querySanpshot = await getDocs(restaurantRef);

        if (!querySanpshot.empty) {
          for (const restaurant of querySanpshot.docs) {

            const menuRef = collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS, restaurant.id, DALLANTS_COLLCTION.MENUS);
            const menuquerySnapshot = await getDocs(menuRef)
  
            if (!menuquerySnapshot.empty) {
              const menuTemp: MenuType[] = []
              menuquerySnapshot.forEach((menu) => {
                menuTemp.push({
                  menuId: menu.data().menuId,
                  menuName: menu.data().menuName,
                  menuDescription: menu.data().menuDescription,
                  menuPrice: menu.data().menuPrice,
                  menuImageUrl: menu.data().menuImageUrl,
                })
              })
              restaurantList.push({
                restaurantId: restaurant.data().restaurantId,
                restaurantName: restaurant.data().restaurantName,
                ordered: restaurant.data().ordered,
                menu: menuTemp
              })
            } else {
              restaurantList.push({
                restaurantId: restaurant.data().restaurantId,
                restaurantName: restaurant.data().restaurantName,
                ordered: restaurant.data().ordered,
                menu: []
              })
            }
          }
          
          return restaurantList

        } else {
          return null
        }

      }
    }
    
  } catch (error: any) {
    console.log("@getOthersList Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const uploadMenuImage = async ( image: File ) => {
  try {

    if (image === null) return;

    const imageRef = ref(storage, `menuImage/${image.name}`);

    const snapshot = await uploadBytes(imageRef, image)
    const url = await getDownloadURL(snapshot.ref)

    return url
    
  } catch (error: any) {
    console.log("@uploadMenuImage Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const createMenu = async ({ restaurantId, menuName, menuDescription, menuPrice, menuImageUrl }: CreateMenuType) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const newMenuRef = doc(collection(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS, restaurantId, DALLANTS_COLLCTION.MENUS));
        await setDoc(newMenuRef, {
          menuId: newMenuRef.id,
          menuName,
          menuDescription,
          menuPrice,
          menuImageUrl
        });

        toast.success(`메뉴가 추가 되었습니다.`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createMenu Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const updateMenu = async ({ restaurantId, menuId, menuName, menuDescription, menuPrice, menuImageUrl }: UpdateMenuType) => {

  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const menuRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS, restaurantId, DALLANTS_COLLCTION.MENUS, menuId);
        
        if (menuImageUrl === undefined) {
          await updateDoc(menuRef, {
            menuName,
            menuDescription,
            menuPrice
          })
        } else {
          await updateDoc(menuRef, {
            menuName,
            menuDescription,
            menuPrice,
            menuImageUrl
          })
        }

        toast.success(`메뉴가 업데이트 되었습니다.`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createMenu Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}

export const deleteMenu = async ({ restaurantId, menuId }: DeleteMenuType) => {
  try {
    const DallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);
    const docSnap = await getDoc(DallantSettingRef);

    if (docSnap.exists()) {
      if (docSnap.data().isActivity) {
        const seasonName = docSnap.data().currentSeasonName

        const menuRef = doc(db, DALLANTS_COLLCTION.DALLENTS, seasonName, DALLANTS_COLLCTION.RESTAURANTS, restaurantId, DALLANTS_COLLCTION.MENUS, menuId);
        await deleteDoc(menuRef);

        toast.success(`메뉴를 삭제하였습니다.`)
      } else {
        toast.error('지금은 달란트 시즌이 아닙니다');
      }
    }
    
  } catch (error: any) {
    console.log("@createMenu Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}


export const openingCellDay = async ( openState: boolean ) => {
  try {
    const dallantSettingRef = doc(db, DALLANTS_COLLCTION.DALLENTS, DALLANTS_COLLCTION.SETTINGS);

    await updateDoc(dallantSettingRef, {
      isCellDayOpen: openState,
    });

    toast.success(`${openState === true ? "영업을 시작합니다." : "영업을 종료합니다."}`)

  } catch (error: any) {
    console.log("@openingCellDay Error: ", error);
    toast.error(`에러가 발생하였습니다\n${error.message.split(":")[0]}`)
  }
}