package TTT.RUSH.Basic.service;

import TTT.RUSH.JDBC.dao.FileSharingRepository;
import TTT.RUSH.JDBC.entity.FileSharingInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

@Service
public class FileSharingService {

    @Autowired
    private FileSharingRepository fileSharingRepository;

    public List<FileSharingInfo> getAllFileSharingInfo() {
        return fileSharingRepository.getAllFileSharingInfo();
    }

    public List<FileSharingInfo> getFileSharingInfoByPartyId(Long partyId) {
        return fileSharingRepository.getFileSharingInfoByPartyId(partyId);
    }

    public void saveFile(MultipartFile file, Long partyId) throws IOException {
        fileSharingRepository.saveFile(file, partyId);
    }

    public ResponseEntity<Resource> downloadFile(Long fileId) {
        return fileSharingRepository.downloadFile(fileId);
    }

    public FileSharingInfo getFileByFileName(String fileName) {
        return fileSharingRepository.getFileByFileName(fileName);
    }

    public void deleteFile(Long fileId) {
        fileSharingRepository.deleteFile(fileId);
    }
}
