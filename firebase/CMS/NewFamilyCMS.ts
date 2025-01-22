import {
  doc,
  DocumentReference,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import {db} from "../../client/firebaseConfig";
import {
  TNewFamilyBirthDataInput,
  TNewFamilyWeeklyInput,
  TRegionDataInput,
} from "../../interface/CMS";
import {NEWMEMBER_COLLECTION} from "../../interface/firebase";

//주간데이터 입력
export async function insertNewFamilyWeeklyData(
  inputValue: TNewFamilyWeeklyInput
) {
  try {
    const weeklyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.WEEKLY,
      inputValue.dateString
    );

    // Firebase에 데이터 저장
    await setDoc(weeklyRef, inputValue);

    const monthlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.MONTHLY,
      `${inputValue.year}-${inputValue.month}`
    );

    await updateMonthlyData(monthlyRef, inputValue);

    // Yearly 데이터 업데이트
    const yearlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.MEMBER,
      NEWMEMBER_COLLECTION.YEARLY,
      inputValue.year
    );

    await updateYearlyData(yearlyRef, inputValue);
  } catch (error: any) {
    console.log("@createTotalServiceAttendance Error: ", error);
  }
}

async function updateMonthlyData(
  monthlyRef: DocumentReference,
  inputValue: TNewFamilyWeeklyInput
) {
  try {
    await runTransaction(db, async (transaction) => {
      const monthlyDoc = await transaction.get(monthlyRef);

      const monthlyData = monthlyDoc.exists()
        ? monthlyDoc.data()
        : {
            total: 0,
            male: 0,
            female: 0,
            group1: 0,
            group2: 0,
            group3: 0,
            group4: 0,
            group5: 0,
            date: `${inputValue.year}-${inputValue.month}-01`,
            month: inputValue.month,
            year: inputValue.year,
          };

      // 누적 데이터 계산
      const updatedData = {
        total: monthlyData.total + inputValue.total,
        male: monthlyData.male + inputValue.male,
        female: monthlyData.female + inputValue.female,
        group1: monthlyData.group1 + inputValue.group1,
        group2: monthlyData.group2 + inputValue.group2,
        group3: monthlyData.group3 + inputValue.group3,
        group4: monthlyData.group4 + inputValue.group4,
        group5: monthlyData.group5 + inputValue.group5,
      };

      transaction.set(monthlyRef, {...monthlyData, ...updatedData});
    });
  } catch (error: any) {
    console.error("@updateMonthlyData Error: ", error);
  }
}

async function updateYearlyData(
  yearlyRef: DocumentReference,
  inputValue: TNewFamilyWeeklyInput
) {
  try {
    await runTransaction(db, async (transaction) => {
      const yearlyDoc = await transaction.get(yearlyRef);

      const yearlyData = yearlyDoc.exists()
        ? yearlyDoc.data()
        : {
            total: 0,
            male: 0,
            female: 0,
            group1: 0,
            group2: 0,
            group3: 0,
            group4: 0,
            group5: 0,
            year: inputValue.year,
          };

      // 누적 데이터 계산
      const updatedData = {
        total: yearlyData.total + inputValue.total,
        male: yearlyData.male + inputValue.male,
        female: yearlyData.female + inputValue.female,
        group1: yearlyData.group1 + inputValue.group1,
        group2: yearlyData.group2 + inputValue.group2,
        group3: yearlyData.group3 + inputValue.group3,
        group4: yearlyData.group4 + inputValue.group4,
        group5: yearlyData.group5 + inputValue.group5,
      };

      transaction.set(yearlyRef, {...yearlyData, ...updatedData});
    });
  } catch (error: any) {
    console.error("@updateYearlyData Error: ", error);
  }
}

// 생년에 따른 데이터 저장
export async function insertBirthData(inputValue: TNewFamilyBirthDataInput) {
  try {
    // Weekly 저장
    const weeklyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.BIRTHYEAR,
      NEWMEMBER_COLLECTION.WEEKLY,
      inputValue.dateString || ""
    );

    await setDoc(weeklyRef, inputValue);

    // Monthly 저장
    const monthlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.BIRTHYEAR,
      NEWMEMBER_COLLECTION.MONTHLY,
      `${inputValue.year}-${inputValue.month}`
    );

    await updateAggregateData(monthlyRef, inputValue);

    // Yearly 저장
    const yearlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.BIRTHYEAR,
      NEWMEMBER_COLLECTION.YEARLY,
      inputValue.year || ""
    );

    await updateAggregateData(yearlyRef, inputValue);
  } catch (error: any) {
    console.error("@insertBirthData Error: ", error.message);
  }
}

async function updateAggregateData(
  ref: any,
  inputValue: TNewFamilyBirthDataInput
) {
  try {
    await runTransaction(db, async (transaction) => {
      const docSnapshot = await transaction.get(ref);

      // 기존 데이터 가져오기
      const existingData = docSnapshot.exists()
        ? (docSnapshot.data() as Record<string, number>)
        : {};

      // 누락된 연도 처리 및 누적 로직
      const years = Array.from({length: 19}, (_, i) => 2006 - i);
      const updatedData = years.reduce((acc, year) => {
        acc[year] = (existingData[year] || 0) + (Number(inputValue[year]) || 0);
        return acc;
      }, {} as Record<string, number>);

      // 날짜 정보 추가
      const metaData = {
        date: inputValue.dateString,
        month: inputValue.month,
        year: inputValue.year,
      };

      transaction.set(ref, {...updatedData, ...metaData});
    });
  } catch (error: any) {
    console.error("@updateAggregateData Error: ", error.message);
  }
}

// 지역데이터 저장
export async function saveRegionData(inputData: TRegionDataInput) {
  const {seoul, gyeonggi, local} = inputData;

  // 월간/연간 키 생성
  const currentDate = new Date();
  const monthKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`; // YYYY-MM 형식
  const yearKey = `${currentDate.getFullYear()}`; // YYYY 형식

  try {
    // 월간 데이터 저장
    const monthlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.REGION,
      NEWMEMBER_COLLECTION.MONTHLY,
      monthKey
    );
    await updateRegionStats(monthlyRef, seoul, gyeonggi, local);

    // 연간 데이터 저장
    const yearlyRef = doc(
      db,
      NEWMEMBER_COLLECTION.NEWMEMBERS,
      NEWMEMBER_COLLECTION.REGION,
      NEWMEMBER_COLLECTION.YEARLY,
      yearKey
    );
    await updateRegionStats(yearlyRef, seoul, gyeonggi, local);

    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving region data: ", error);
    throw error;
  }
}

// 새가족 등록, 지역별 데이터 저장
async function updateRegionStats(
  ref: any,
  seoul: {district: string; count: number | string}[],
  gyeonggi: {city: string; count: number | string}[],
  local: number | string
) {
  await runTransaction(db, async (transaction) => {
    const docSnapshot = await transaction.get(ref);

    // 기존 데이터를 적절한 타입으로 캐스팅
    const existingData = docSnapshot.exists()
      ? (docSnapshot.data() as {
          seoul?: Record<string, number>;
          gyeonggi?: Record<string, number>;
          local?: number;
        })
      : {};

    // 서울 데이터 누적
    const updatedSeoul = seoul.reduce((acc, curr) => {
      const existingCount = existingData.seoul?.[curr.district] || 0;
      acc[curr.district] = Number(existingCount) + Number(curr.count || 0);
      return acc;
    }, {} as Record<string, number>);

    // 경기도 데이터 누적
    const updatedGyeonggi = gyeonggi.reduce((acc, curr) => {
      const existingCount = existingData.gyeonggi?.[curr.city] || 0;
      acc[curr.city] = Number(existingCount) + Number(curr.count || 0);
      return acc;
    }, {} as Record<string, number>);

    // 지방 데이터 누적
    const updatedLocal = Number(existingData.local || 0) + Number(local || 0);

    // 트랜잭션으로 데이터 저장
    transaction.set(ref, {
      seoul: updatedSeoul,
      gyeonggi: updatedGyeonggi,
      local: updatedLocal,
    });
  });
}
