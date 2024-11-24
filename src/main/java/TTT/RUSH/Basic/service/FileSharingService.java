package TTT.RUSH.Basic.service;

import TTT.RUSH.JDBC.entity.FileSharingInfo;
import TTT.RUSH.JDBC.dao.FileSharingRepository;

import org.apache.tomcat.jni.FileInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;

@Service
public class FileSharingService {
    @Autowired
    private FileSharingRepository fileRepository;

    public void saveFile(MultipartFile file, Long groupId) throws Exception {
        //파일과 정보를 bd에 저장
        FileSharingInfo fileInfo = new FileSharingInfo();
        fileInfo.setFileName(file.getOriginalFilename());//파일 이름 저장
        fileInfo.setGroupId(groupId);//group id 저장
        fileInfo.setFileData(file.getBytes());//파일 저장
        fileInfo.setCreatedDate(new Date());//생성 날짜 저장
        fileInfo.setUpdatedDate(new Date());//업데이트 날짜 저장
        fileRepository.save(fileInfo);//fileRepository에 저장
    }

    public FileSharingInfo getFileById(Long fileId) throws Exception {//file id 받아서 return 파일과 파일정보
        FileSharingInfo fileInfo = fileRepository.findById(fileId)//fileId에 해당하는 파일과 파일정보 가져오기
            .orElseThrow(() -> new Exception("File not found with ID: " + fileId));
        return fileInfo;
    }
    public FileSharingInfo getFileByFileName(String fileName) throws Exception{
        FileSharingInfo fileInfo = fileRepository.findByFileName(fileName);
        if (fileInfo == null) {
            throw new Exception("File not found with fileName: " + fileName);
        }
        return fileInfo;
    }

    public void deleteFile(Long fileId) throws Exception {
        if (fileRepository.existsById(fileId)) {
            fileRepository.deleteById(fileId);
        } else {
            throw new Exception("File not found with ID: " + fileId);
        }
    }
}
