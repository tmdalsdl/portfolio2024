본인이 한 일(뭐했는지)
1. 도커 컨테이너에 2티어 구성(nginx, django)
2. github action을 통해 ci/cd 구현
3. github action에서 구현한 항목
  1) github에 올라온 데이터를 build 후 docker hub에 push
  2) 'Admin-server'라는 인스턴스 네임이 등록된 EC2로부터 Public IP 추출
  3) CloudFront의 도메인 네임 추출
  4) secret에 등록된 RDS의 인스턴스 이름과 동일한 인스턴스의 RDS Endpoint 추출
  5) github action에 등록한 secret 데이터와 추출한 정보들 가져와 .env에 저장
  6) EC2에 ssh로 접속하여 Docker, AWS CLI, kubectl, mysql-client 설치
  7) EKS에 구현된 Grafana의 URL 추출
  8) docker hub의 이미지를 가져와 docker container 구성
  9) RDS Endpoint를 사용하여 mariaDB로 접속해서 Database, User 생성 후 권한 부여
  10) Django가 실행된 container에서 makemaigration, maigrate 실행 
=> 이 과정을 통해 github의 setting에서 secret에 pem키만 수정한 뒤 Actions > CI and Deploy > Run workflow를 누름으로써 admin page가 자동으로 구성되고 관리자는 EC2의 public IP, 포트번호(8888로 설정), page명(adminpage)을 입력하여 AdminPage로 접속 가능(http://publicIP:8888/adminpage)


이 기능을 왜 사용했는지.

사용한 이유(다른것도 있으나 이것을 왜)
1. kubernetes를 사용하지 않고 Docker Container로 구성한 점
  - 관리자 페이지는 사용자가 제한적이고 트래픽이 상대적으로 적을 것으로 예상됩니다. 
    따라서 Kubernetes의 복잡한 기능들이 불필요하다고 판단했습니다.
2. 다른 CI/CD를 사용하지 않고 Github Action을 사용한 점
  - 통합성: "GitHub Actions는 우리의 코드 저장소와 완벽하게 통합되어 있어, 추가적인 외부 서비스 설정 없이 CI/CD 파이프라인을 구축할 수 있었습니다."
  - 간편한 설정: "YAML 파일 하나로 워크플로우를 정의할 수 있어, 복잡한 설정 없이도 빠르게 파이프라인을 구축할 수 있었습니다."
  - 리소스 효율성: "별도의 CI/CD 서버를 유지할 필요가 없어 리소스와 관리 부담을 줄일 수 있었습니다."
  - 보안: "GitHub의 보안 기능들을 그대로 활용할 수 있어, 추가적인 보안 설정에 대한 부담을 줄일 수 있었습니다."
