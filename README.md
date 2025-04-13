# portfolio2024
서버리스 비활성화. API Gateway, Lambda 함수, DynamoDB는 유지하지만 API Stage(portfolio2024)를 제거하여 서버리스 파트 전체 비활성화.

## 추후 다시 활성화 방법
1. AWS Management Console에서 API Gateway로 이동.
2. 내보낸 JSON 파일을 사용하여 새 Stage 생성:
   - API Gateway 콘솔에서 "Import API"를 클릭.
   - JSON 파일 선택 후 Import 진행.
3. 새 Stage를 배포:
   - Stage 이름 지정 (예: portfolio2024).
   - 배포 완료 후 엔드포인트 URL 확인.
   - Github의 script > homeScript.js에서 API Stage EndPoint URL 수정.
4. Lambda 함수와 DynamoDB 연결 확인:
   - Lambda 함수가 올바르게 트리거되는지 확인.
   - DynamoDB 테이블과의 데이터 흐름 점검.

## 참고
- 내보낸 JSON 파일은 OpenAPI 3 형식으로 저장되어 있으며, GitHub 저장소에 포함되어 있음.
- 필요 시 AWS CLI 또는 SDK를 사용해 자동화된 복구도 가능.

## AWS CLI 또는 SDK 사용법 :
aws apigateway import-rest-api \
  --body 'file://path-to-json-file.json'
