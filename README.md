# portfolio2024
서버리스 비활성화. API Gateway, Lambda 함수, DynamoDB는 유지하지만 API Stage(portfolio2024)를 제거하여 서버리스 파트 전체 비활성화.

## 추후 다시 활성화 방법1 (스테이지만 삭제 후 복구)
1. AWS Management Console에서 API Gateway로 이동.
2. 복구하려는 API를 선택.
3. 새 스테이지 생성:
   - "Stages" 메뉴에서 "Create Stage" 클릭.
   - 스테이지 이름 지정 (예: dev 또는 prod).
4. 기존 배포 이력 선택:
   - 새로 생성된 스테이지에서 "Deployment History" 탭 클릭.
   - 이전 배포 이력 중 하나를 선택하여 복원.
5. 엔드포인트 URL 확인 및 테스트:
   - 새로 생성된 스테이지의 엔드포인트 URL을 확인하고 정상 작동 여부를 테스트.
   - 
## 추후 다시 활성화 방법2 (API Gateway까지 삭제된 경우)
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
