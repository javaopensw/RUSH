package TTT.RUSH.JDBC.dao;

import TTT.RUSH.JDBC.entity.FileSharingInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileSharingRepository extends JpaRepository<FileSharingInfo, Long> {
    List<FileSharingInfo> findByGroupId(Long groupId);//BD에서 파일과 파일정보 list형태로 가져오기.
    FileSharingInfo findByFileName(String fileName);//파일 이름으로 파일과 파일정보 가져오기
}
