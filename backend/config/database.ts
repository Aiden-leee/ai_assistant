import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import path from 'path';

// .env 파일을 가장 먼저 로드하여 임포트 단계에서 환경 변수가 비어 크래시나는 것을 방지
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, '../', envFile) });

// 환경 변수 확인
const databaseUrl = process.env.DATABASE_URL;

// console.log("databaseUrl: ", databaseUrl);

if (!databaseUrl) {
  console.warn('⚠️  DATABASE_URL이 설정되지 않았습니다. .env.development 파일을 확인하세요.');
}

// Neon 데이터베이스 연결 설정
export const sql = neon(process.env.DATABASE_URL!);

// 데이터베이스 연결 테스트
export const testConnection = async (): Promise<boolean> => {
  try {
    if (!databaseUrl) {
      console.warn('⚠️  DATABASE_URL이 설정되지 않아 연결 테스트를 건너뜁니다.');
      return false;
    }
    
    await sql`SELECT 1`;
    console.log('✅ 데이터베이스 연결 성공');
    return true;
  } catch (error) {
    console.error('❌ 데이터베이스 연결 실패:', error);
    console.error('💡 env.development 파일에서 DATABASE_URL을 올바르게 설정했는지 확인하세요.');
    return false;
  }
};
