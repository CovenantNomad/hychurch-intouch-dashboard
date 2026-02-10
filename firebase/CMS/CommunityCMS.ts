import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {COMMUNITY_COLLCTION} from "../../interface/firebase";

// 등록
export async function createIntegratedCommunity(name: string): Promise<void> {
  const communityRef = collection(
    db,
    COMMUNITY_COLLCTION.COMMUNITY,
    COMMUNITY_COLLCTION.INTEGRATED,
    COMMUNITY_COLLCTION.COMMUNITY_LIST,
  );

  // Firebase에 데이터 저장
  await addDoc(communityRef, {name});
}

// 삭제
export async function deleteIntegratedCommunity(id: string): Promise<void> {
  await deleteDoc(
    doc(
      db,
      COMMUNITY_COLLCTION.COMMUNITY,
      COMMUNITY_COLLCTION.INTEGRATED,
      COMMUNITY_COLLCTION.COMMUNITY_LIST,
      id,
    ),
  );
}

export async function getIntegratedCommunities(): Promise<
  {id: string; name: string}[]
> {
  const communityRef = collection(
    db,
    COMMUNITY_COLLCTION.COMMUNITY,
    COMMUNITY_COLLCTION.INTEGRATED,
    COMMUNITY_COLLCTION.COMMUNITY_LIST,
  );

  const snap = await getDocs(communityRef);

  return snap.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
}
