import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../client/firebaseConfig";

export const uploadMemberProfileImage = async (
  userId: string,
  file: File,
): Promise<void> => {
  try {
    const profileRef = ref(storage, `members/${userId}/profile`);

    await uploadBytes(profileRef, file, {
      contentType: "image/jpeg",
      customMetadata: {
        userId,
      },
    });
  } catch (error) {
    console.error("@uploadMemberProfileImage:", error);

    throw new Error("프로필 사진을 저장하는 중 오류가 발생했습니다.");
  }
};

export const getMemberProfileImage = async (
  userId: string,
): Promise<string | null> => {
  try {
    const profileRef = ref(storage, `members/${userId}/profile`);

    return await getDownloadURL(profileRef);
  } catch (error: any) {
    if (error?.code === "storage/object-not-found") {
      return null;
    }

    console.error("@getMemberProfileImage:", error);
    return null;
  }
};

export const deleteMemberProfileImage = async (
  userId: string,
): Promise<void> => {
  try {
    const profileRef = ref(storage, `members/${userId}/profile`);

    await deleteObject(profileRef);
  } catch (error: any) {
    if (error?.code === "storage/object-not-found") {
      return;
    }

    console.error("@deleteMemberProfileImage:", error);

    throw new Error("프로필 사진을 삭제하는 중 오류가 발생했습니다.");
  }
};
