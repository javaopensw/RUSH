package TTT.RUSH.JDBC.dao;

import TTT.RUSH.JDBC.entity.FileSharingInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.io.IOException;

@Repository
public class FileSharingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 모든 파일 정보를 가져오는 메서드
    public List<FileSharingInfo> getAllFileSharingInfo() {
        String sql = "SELECT * FROM file_sharing_info";
        return jdbcTemplate.query(sql, new FileSharingInfoRowMapper());
    }

    // 특정 그룹의 파일 정보를 가져오는 메서드
    public List<FileSharingInfo> getFileSharingInfoByPartyId(Long partyId) {
        String sql = "SELECT * FROM file_sharing_info WHERE party_id = ?";
        return jdbcTemplate.query(sql, new FileSharingInfoRowMapper(), partyId);
    }

    // 파일 저장
    public void saveFile(MultipartFile file, Long groupId) throws IOException {
        String sql = "INSERT INTO file_sharing_info (party_id, file_name, file_data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                groupId,
                file.getOriginalFilename(),
                file.getBytes(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );
    }

    // 파일 이름으로 검색
    public FileSharingInfo getFileByFileName(String fileName) {
        String sql = "SELECT * FROM file_sharing_info WHERE file_name = ?";
        List<FileSharingInfo> result = jdbcTemplate.query(sql, new FileSharingInfoRowMapper(), fileName);

        if (result.isEmpty()) {
            throw new IllegalArgumentException("File not found with fileName: " + fileName);
        }

        return result.get(0);
    }

    // 파일 ID로 삭제
    public void deleteFile(Long fileId) {
        String sql = "DELETE FROM file_sharing_info WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, fileId);

        if (rowsAffected == 0) {
            throw new IllegalArgumentException("File not found with ID: " + fileId);
        }
    }

    // RowMapper 구현
    private static class FileSharingInfoRowMapper implements RowMapper<FileSharingInfo> {
        @Override
        public FileSharingInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
            FileSharingInfo fileSharingInfo = new FileSharingInfo();
            fileSharingInfo.setId(rs.getLong("id"));
            fileSharingInfo.setGroupId(rs.getLong("party_id"));
            fileSharingInfo.setFileName(rs.getString("file_name"));
            fileSharingInfo.setFileData(rs.getBytes("file_data"));
            fileSharingInfo.setCreatedAt(rs.getTimestamp("created_at"));
            fileSharingInfo.setUpdatedAt(rs.getTimestamp("updated_at"));
            return fileSharingInfo;
        }
    }
}
