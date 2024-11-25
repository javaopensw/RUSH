package TTT.RUSH.JDBC.dao;

import TTT.RUSH.JDBC.entity.FileSharingInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

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
    public void saveFile(MultipartFile file, Long partyId) throws IOException {
        String sql = "INSERT INTO file_sharing_info (party_id, file_name, file_data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.update(
                sql,
                partyId,
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

    // 파일 다운로드
    public ResponseEntity<Resource> downloadFile(Long fileId) {
        String sql = "SELECT * FROM file_sharing_info WHERE id = ?";
        List<FileSharingInfo> result = jdbcTemplate.query(sql, new FileSharingInfoRowMapper(), fileId);

        if (result.isEmpty()) {
            throw new IllegalArgumentException("File not found with ID: " + fileId);
        }

        FileSharingInfo fileSharingInfo = result.get(0);
        try{
            // 파일 데이터와 파일 이름 가져오기
            byte[] fileData = fileSharingInfo.getFileData();
            String fileName = fileSharingInfo.getFileName();

            // 파일 데이터를 ByteArrayResource로 변환
            ByteArrayResource resource = new ByteArrayResource(fileData);

            // HTTP 응답 생성
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(fileData.length)
                    .body(resource);
        } catch (Exception e) {
            // 예외 발생 시 500 Internal Server Error 반환
            return ResponseEntity.internalServerError()
                    .body(null);
        }  
    }

    // RowMapper 구현
    private static class FileSharingInfoRowMapper implements RowMapper<FileSharingInfo> {
        @Override
        public FileSharingInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
            FileSharingInfo fileSharingInfo = new FileSharingInfo();
            fileSharingInfo.setId(rs.getLong("id"));
            fileSharingInfo.setPartyId(rs.getLong("party_id"));
            fileSharingInfo.setFileName(rs.getString("file_name"));
            fileSharingInfo.setFileData(rs.getBytes("file_data"));
            fileSharingInfo.setCreatedAt(rs.getTimestamp("created_at"));
            fileSharingInfo.setUpdatedAt(rs.getTimestamp("updated_at"));
            return fileSharingInfo;
        }
    }
}
